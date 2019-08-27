import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { i18n } from './lang/lang';
import { pushWhiteUrl, deleteWhiteUrl, getWhiteUrl, editWhiteUrl } from './services/chrome.service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueI18n)

window.onload = function() {
    new Vue({
        el: '#ts-ext-page',
        i18n: i18n,
        data: () => {
            return {
                lang: 'en',
                whiteUrl: [],
                urlAdd: '',
                isLoadWhiteUrl: true,
                oldEditUrl: '',
                newEditUrl: '',
                messageAdd: '',
                currentTab: 'support_urls',
                page: 'setting',
                age: 25
            }
        },
        created() {
            var d = new Date();
            var n = d.getFullYear();
            this.age = n - 1994
            this.lang = this.$i18n.locale
            let _this = this
            getWhiteUrl().then(function(result) {
                if(typeof result != "undefined") {
                    _this.whiteUrl = result
                }
                _this.isLoadWhiteUrl = false
            })
        },
        methods: {
            changeLang(lang) {
                this.lang = lang
                this.$i18n.locale = this.lang
            },
            addUrl(url) {
                let _this = this
                pushWhiteUrl(url).then(function (result) {
                    _this.whiteUrl = result
                    _this.urlAdd = ''
                }).catch(function (error) {

                })
            },
            saveEditUrl(oldUrl, newUrl) {
                let _this = this
                editWhiteUrl(oldUrl, newUrl).then(function (result) {
                    _this.whiteUrl = result
                    _this.urlAdd = ''
                }).catch(function (error) {
                    if(error.error == 'is_exists') {
                        _this.messageAdd = 'had_exists'
                    }
                })
            },
            editUrl(url) {
                this.oldEditUrl = url
                this.newEditUrl = url
            },
            deleteUrl(url) {
                let _this = this
                deleteWhiteUrl(url).then(function(result) {
                    if(typeof result != "undefined") {
                        _this.whiteUrl = result
                    }
                    _this.isLoadWhiteUrl = false
                })
            },
            changeTab(currentTab) {
                this.currentTab = currentTab
            },
            changePage(page) {
                this.page = page
            }
        }
    })
}