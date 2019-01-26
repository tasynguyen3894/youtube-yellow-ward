<template>
    <div class="ts-ext-sidebar">
        <ul>
            <li v-bind:class="{'active': $store.state.tab == 'search'}" @click="changeTab('search')">
                {{ this.$t("sidebar.search") }}
            </li>
            <li v-bind:class="{'active': $store.state.tab == 'watch'}" @click="changeTab('watch')">
                {{ this.$t("sidebar.watch") }}
            </li>
            <li v-bind:class="{'active': $store.state.tab == 'user'}" @click="changeTab('user')">
                {{ this.$t("sidebar.user") }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'SideBar',
    data: () => {
        return {
            
        }
    },
    methods: {
        changeTab(tab) {
            if(tab != 'watch' && this.$store.state.setting.pauseWhenChangeTab == true) {
                if(document.getElementById('ts_app_iframe')) {
                    let iframe = document.getElementById('ts_app_iframe')
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            this.$store.commit('setTab', { tab: tab })
        }
    }
}
</script>
<style scoped>
    .ts-ext-sidebar {
        position: absolute;
        display: block;
        width: 100%;
        bottom: 0;
    }

    .ts-ext-sidebar ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
        border-top: 3px solid #DD5542;
    }

    .ts-ext-sidebar ul li {
        flex: 1;
        text-align: center;
        padding: 10px;
        border-left: 1px solid #DD5542;
        background: #FFF;
        cursor: pointer;
    }

    .ts-ext-sidebar ul li:first-child {
        border-left: none;
    }

    .ts-ext-sidebar ul li:hover {
        color: #FFF;
        background: #DD5542;
        border-color: #FFF;
    }

    .ts-ext-sidebar ul li.active {
        color: #FFF;
        background: #DD5542;
        border-color: #FFF;
    }
</style>

