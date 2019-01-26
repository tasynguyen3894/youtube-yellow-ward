<template>
    <div class="ts-ext-setting ts-ext-content">
        <div class="ts-ext-tabs">
            <ul>
                <li @click="changeTab('setting')" v-bind:class="{ active: tab == 'setting' }">{{ this.$t("user.setting.setting") }}</li>
                <li @click="changeTab('save')" v-bind:class="{ active: tab == 'save' }">{{ this.$t("user.saved.saved") }}</li>
            </ul>
        </div>
        <div>
            <div v-show="tab == 'setting'" class="ts-ext-tab-content">
                <Setting></Setting>
            </div>
            <div v-show="tab == 'save'" class="ts-ext-tab-content">
                <SaveList></SaveList>
            </div>
        </div>
    </div>
</template>
<script>
import Setting from './Setting.vue'
import SaveList from './SaveList.vue'

export default {
    name: 'User',
    data: () => {
        return {
            tab: 'setting'
        }
    },
    methods: {
        changeTab(tab) {
            this.tab = tab
        }
    },
    components: {
        Setting,
        SaveList
    }
}
</script>
<style>
    .ts-ext-setting {
        padding: 15px;
    }

    .ts-ext-setting .ts-ext-tabs ul {
        margin: 0px;
        padding: 0px;
        display: flex;
        list-style: none;
    }

    .ts-ext-setting .ts-ext-tabs ul li {
        flex: 1;
        text-align: center;
        background: #333;
        color: #FFF;
        padding: 15px;
        border: 2px solid #333;
        border-bottom: none;
        cursor: pointer;
    }

    .ts-ext-setting .ts-ext-tabs ul li:first-child {
        border-radius: 15px 0px 0px 0px;
    }

    .ts-ext-setting .ts-ext-tabs ul li:hover {
        background: #FFF;
        color: #333;
    }

    .ts-ext-setting .ts-ext-tabs ul li:last-child {
        border-radius: 0px 15px 0px 0px;
    }

    .ts-ext-setting .ts-ext-tabs ul li.active {
        background: #FFF;
        color: #333;
    }

    .ts-ext-setting .ts-ext-tab-content {
        border: 2px solid #333;
        border-top: none;
        padding: 10px;
    }
</style>
