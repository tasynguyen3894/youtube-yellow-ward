import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import list from './components/list.vue'
import Search from './components/screens/Search/Search.vue'
import Sidebar from './components/layout/SideBar.vue'
import VideoDetail from './components/screens/Watch/VideoDetail.vue';
import AppHeader from './components/layout/AppHeader.vue';
import QuickSetting from './components/layout/QuickSetting.vue'
import User from './components/screens/User/User.vue';
import { fromEvent } from 'rxjs'
import { flatMap, takeUntil } from 'rxjs/operators'
import { store } from './store/store'
import { i18n } from './lang/lang';
import { getSetting, setSetting, getSaveVideo, getWhiteUrl } from './services/chrome.service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave, faPauseCircle, faPlayCircle, faStopCircle, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave, faPauseCircle, faPlayCircle, faStopCircle, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)


const chromePlugin = {
    install(Vue, options) {
        Vue.prototype.$chrome = chrome
    }
}
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(chromePlugin)
Vue.prototype.$eventBus = new Vue();
// Vue.prototype.$chrome = chrome;


window.tsExtLocation = {
    top: 5,
    left: 10
}

window.onload = function() {
    getWhiteUrl().then(function (result) {
        let currentUrl = window.location.origin + window.location.pathname
        let isMatch = result.filter(function (url) {
            // return currentUrl.indexOf(url) > -1
            return url == currentUrl
        }).length;
        if(isMatch > 0) {
            addVue()
        }
    })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "add_url") {
        addVue()
        sendResponse({status: true});
    }
    if (request.action == "remove_url") {
        removeVue()
        sendResponse({status: true});
    }
});

function removeVue() {
    document.getElementById('ts-ext-main').remove()
}

function addVue() {
    let elem = document.createElement('div');
    elem.id = "ts-ext-main";
    elem.style.top = window.tsExtLocation.top
    elem.style.left = window.tsExtLocation.left
    elem.innerHTML = `
        <App_header ref='header' v-bind:is_show="isShow" v-on:change_is_show="showOrHide"></App_header>
        <div class="ts-ext-main" v-show="isShow" v-if="!isLoadSetting">
            <div v-show="$store.state.tab == 'watch'">
                <Videodetail v-bind:video="videoWatch"></Videodetail>
            </div>
            <Search v-show="$store.state.tab == 'search'" v-show="isShow" v-on:watch_video="watchVideo"></Search>
            <User v-show="$store.state.tab == 'user'"></User>
            <Sidebar></Sidebar>
        </div>
        <Quicksetting v-show="!isShow && $store.state.currentVideo"></Quicksetting>
        <div class="ts-ext-main" v-show="isShow && isLoadSetting">
            Loading setting
        </div>
    `;
    document.body.appendChild(elem)
    new Vue({
        store: store,
        i18n: i18n,
        el: '#ts-ext-main',
        data: () => {
            return {
                isShow: false,
                isLoadSetting: true,
                videoWatch: null
            }
        },
        created() {
            let _this = this
            getSetting().then(function(result) {
                if(typeof result != "undefined") {
                    _this.$store.commit('setSetting', result)
                } else {
                    setSetting(_this.$store.state.setting)
                }
                _this.isLoadSetting = false
            })

            getSaveVideo().then(function(result) {
                if(typeof result != "undefined") {
                    _this.$store.commit('setSaveVideo', { saveVideo: result })
                } else {
                    _this.$store.commit('setSaveVideo', { saveVideo: [] })
                }
            })
            
            this.$eventBus.$on('watch', this.watchVideo)
        },
        methods: {
            showOrHide(isShow) {
                this.isShow = isShow
            },
            watchVideo(video) {
                this.videoWatch = video;
            },
            increment () {
                this.$store.commit('increment')
            },
            decrement () {
                this.$store.commit('decrement')
            }
        },
        components: {list, Search, Sidebar, Videodetail: VideoDetail, App_header: AppHeader, User, Quicksetting: QuickSetting},
        mounted() {
            let el = this.$el;
            let header = this.$refs.header.$el;
            let mouseDown = fromEvent(header, 'mousedown');
            let mouseMove = fromEvent(document, 'mousemove');
            let mouseUp = fromEvent(header, 'mouseup');

            let startX, startY;

            let mouseDrag = mouseDown.pipe(flatMap((md) => {
                var rect = md.currentTarget.getBoundingClientRect()
                startX = md.clientX - rect.left;
                startY = md.clientY - rect.top;
                return mouseMove.pipe(takeUntil(mouseUp));
            }));

            mouseDrag.subscribe((mm) => {
                el.style.left = mm.clientX - startX + 'px';
                el.style.top = mm.clientY - startY + 'px';
                window.tsExtLocation.top = el.style.top
                window.tsExtLocation.left = el.style.left
            });
        }
    })
}