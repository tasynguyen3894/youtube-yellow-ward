import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { store } from './store/store'
import { i18n } from '../../src/lang/lang';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
import chrome from 'sinon-chrome'

library.add(faUserSecret, faAngleUp, faAngleDown, faTrashAlt, faLink, faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const chromePlugin = {
    install(Vue, options) {
        Vue.prototype.$chrome = chrome
    }
}


Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(chromePlugin)

const render = {
    store: store,
    i18n: i18n
}

export const RenderShallowMount = function (component) {
    return shallowMount(component, render) 
}