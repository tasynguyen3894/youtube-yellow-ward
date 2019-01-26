import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import list from './components/list.vue'
import Search from './components/screens/Search/Search.vue'
import Sidebar from './components/layout/SideBar.vue'
import VideoDetail from './components/screens/Watch/VideoDetail.vue';
import AppHeader from './components/layout/AppHeader.vue';
import User from './components/screens/User/User.vue';
import { fromEvent } from 'rxjs'
import { flatMap, takeUntil } from 'rxjs/operators'
import { store } from './store/store'
import { i18n } from './lang/lang';
import { getSetting, setSetting, getSaveVideo } from './services/chrome.service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)
Vue.use(VueI18n)

Vue.prototype.$eventBus = new Vue();

window.onload = function() {

    var elem = document.createElement('div');
    elem.id = "ts-ext-main";
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
        components: {list, Search, Sidebar, Videodetail: VideoDetail, App_header: AppHeader, User},
        mounted() {
            let el =this.$el;
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
            });
        }
    })
}

