<template>
    <div class="ts-ext-setting-detail">
        <div v-show="!isLoading">
            <div>
                <span>{{ this.$t("user.setting.pause_when_change_tab") }}</span>
                <input type="checkbox" v-model="setting.pauseWhenChangeTab">
            </div>
            <div>
                <span>{{ this.$t("user.setting.pause_when_hide_app") }}</span>
                <input type="checkbox" v-model="setting.pasueWhenHide">
            </div>
            <div>
                <span>{{ this.$t("user.setting.max_result") }}</span>
                <input type="number" max="20" v-model="setting.maxResult">
            </div>
            <div class="ts-ext-btn-group">
                <button @click="save">{{ this.$t("user.setting.save") }}</button>
                <button @click="synchronous">{{ this.$t("user.setting.synchronous_setting") }}</button>
            </div>
            <div v-if="saveDone" class="ts-ext-message">
                {{ this.$t("user.setting.saved") }}
            </div>
        </div>
        <div v-show="isLoading">Loading setting</div>
    </div>
</template>
<script>
import {getSetting, setSetting} from '../../../services/chrome.service'

export default {
    name: 'Setting',
    data: () => {
        return {
            setting: {
                maxResult: 10,
                pasueWhenHide: false,
                pauseWhenChangeTab: false
            },
            isLoading: true,
            saveDone: false
        }
    },
    created: function() {
        let {maxResult, pasueWhenHide, pauseWhenChangeTab} = this.$store.state.setting;
        this.setting.maxResult = maxResult ? maxResult : this.setting.maxResult
        this.setting.pasueWhenHide = pasueWhenHide ? pasueWhenHide : this.setting.pasueWhenHide
        this.setting.pauseWhenChangeTab = pauseWhenChangeTab ? pauseWhenChangeTab : this.setting.pauseWhenChangeTab
        this.isLoading = false
    },
    methods: {
        save: function () {
            if(isNaN(this.setting.maxResult) || this.setting.maxResult == "" || this.setting.maxResult > 20) {
                this.setting.maxResult = 10
            }
            this.saveDone = true
            this.isLoading = true
            this.$store.commit('setSetting', this.setting)
            setSetting(this.setting)
            this.isLoading = false
        },
        synchronous() {
            let _this = this
            // this.$eventBus.$emit('watch')
            getSetting().then(function(result) {
                _this.$store.commit('setSetting', result)
                _this.isLoadSetting = false
                _this.saveDone = true
                let {maxResult, pasueWhenHide, pauseWhenChangeTab} = _this.$store.state.setting;
                _this.setting.maxResult = maxResult ? maxResult : _this.setting.maxResult
                _this.setting.pasueWhenHide = pasueWhenHide ? pasueWhenHide : _this.setting.pasueWhenHide
                _this.setting.pauseWhenChangeTab = pauseWhenChangeTab ? pauseWhenChangeTab : _this.setting.pauseWhenChangeTab
            })
            
        }
    }
}
</script>
<style scoped>
    .ts-ext-setting-detail > div div {
        overflow: hidden;
        margin-bottom: 10px;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }

    .ts-ext-setting-detail > div div span {
        float: left;
    }

    .ts-ext-setting-detail > div div input {
        float: right;
        outline: none;
        border-radius: 0px;
    }

    .ts-ext-setting-detail > div div.ts-ext-btn-group {
        border-bottom: none;
        display: block;
    }

    .ts-ext-setting-detail > div div.ts-ext-btn-group button {
        /* flex: 1; */
        width: calc(50% - 3px);
        background: #0271BC;
        border: 2px solid #0271BC;
        box-sizing: border-box;
        color: #FFF;
        padding: 10px;
        cursor: pointer;
        box-shadow: none;
        outline: none;
        font-size: 12px;
    }

    .ts-ext-setting-detail > div div.ts-ext-btn-group button:hover {
        background: #FFF;
        color: #0271BC;
    }

    .ts-ext-setting-detail .ts-ext-message {
        color: #DD5542;
    }

    .ts-ext-setting-detail > div div input[type=number] {
        width: 35px;
        box-sizing: content-box;
        font-size: 11px;
        height: 13px;
        padding: 1px;
    }
</style>
