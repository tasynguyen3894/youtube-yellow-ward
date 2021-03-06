import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        count: 0,
        title: 'Youtube Yellow Ward',
        currentVideo: null,
        tab: 'search',
        keyword: null,
        setting: {
            maxResult: 10,
            pasueWhenHide: false,
            pauseWhenChangeTab: false
        },
        saveVideo: []
    },
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        },
        setTitle (state, { title }) {
            state.title = title
        },
        setCurrentVideo (state, { id }) {
            state.currentVideo = id
        },
        setTab (state, { tab }) {
            state.tab = tab
        },
        setKeyword (state, { keyword }) {
            state.keyword = keyword
        },
        setSaveVideo (state, { saveVideo }) {
            state.saveVideo = saveVideo
        },
        setSetting(state, {maxResult, pasueWhenHide, pauseWhenChangeTab}) {
            state.setting.maxResult = maxResult != null ? maxResult : state.setting.maxResult
            state.setting.pasueWhenHide = pasueWhenHide != null ? pasueWhenHide : state.setting.pasueWhenHide
            state.setting.pauseWhenChangeTab = pauseWhenChangeTab != null ? pauseWhenChangeTab : state.setting.pauseWhenChangeTab
        }
    }
})