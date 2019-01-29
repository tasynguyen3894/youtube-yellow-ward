import Vue from 'vue'
import { pushWhiteUrl, deleteWhiteUrl, getWhiteUrl, editWhiteUrl } from './services/chrome.service'

window.onload = function() {
    new Vue({
        el: '#ts-ext-page',
        data: () => {
            return {
                whiteUrl: [],
                urlAdd: '',
                isLoadWhiteUrl: true,
                oldEditUrl: '',
                newEditUrl: '',
                messageAdd: ''
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
            }
        }
    })
}

