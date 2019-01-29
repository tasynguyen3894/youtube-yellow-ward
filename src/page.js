import Vue from 'vue'
import { pushWhiteUrl, deleteWhiteUrl, getWhiteUrl } from './services/chrome.service'

window.onload = function() {
    new Vue({
        el: '#ts-ext-page',
        data: () => {
            return {
                whiteUrl: [],
                urlAdd: '',
                isLoadWhiteUrl: true
            }
        },
        created() {
            let _this = this
            getWhiteUrl().then(function(result) {
                if(typeof result != "undefined") {
                    _this.whiteUrl = result
                }
                _this.isLoadWhiteUrl = false
            })
        },
        methods: {
            addUrl(url) {
                let _this = this
                pushWhiteUrl(url).then(function (result) {
                    _this.whiteUrl = result
                    _this.urlAdd = ''
                })
            }
        }
    })
}

