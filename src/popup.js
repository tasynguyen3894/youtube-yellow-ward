import Vue from 'vue'
import { pushWhiteUrl, deleteWhiteUrl } from './services/chrome.service'

window.onload = function() {
    new Vue({
        el: '#ts-ext-popup',
        data: () => {
            return {

            }
        },
        methods: {
            addUrl() {
                let _this = this
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {
                    // and use that tab to fill in out title and url
                    var tab = tabs[0], urlAdd = '';
                    urlAdd = _this.formatUrl(tab.url)
                    pushWhiteUrl(urlAdd).then(function (result) {
                        chrome.tabs.sendMessage(tab.id, {action: "add_url"}, function(response) {});
                    }).catch(function (error) {
                    });
                });
            },
            deleteUrl() {
                let _this = this
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {
                    // and use that tab to fill in out title and url
                    var tab = tabs[0], urlDelete = '';
                    urlDelete = _this.formatUrl(tab.url)
                    deleteWhiteUrl(urlDelete).then(function (result) {
                        chrome.tabs.sendMessage(tab.id, {action: "remove_url"}, function(response) {});
                    }).catch(function (error) {
                    });
                });
            },
            openSetting() {
                let url = 'chrome-extension://' + chrome.runtime.id + '/page.html'
                chrome.tabs.create({url: url})
            },
            formatUrl(url) {
                if(url.indexOf('?') > -1 || url.indexOf('#')) {
                    return url.split("?")[0].split("#")[0]
                }
                return url
            }
        }
    })
}