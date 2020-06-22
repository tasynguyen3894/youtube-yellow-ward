<template>
    <div class="ts-ext-quick-setting">
        <span @click="run('play')">
            <font-awesome-icon v-bind:icon="'play-circle'" />
        </span>
        <span @click="run('pause')">
            <font-awesome-icon v-bind:icon="'pause-circle'" />
        </span>
        <span @click="run('stop')">
            <font-awesome-icon v-bind:icon="'stop-circle'" />
        </span>
    </div>
</template>
<script>
export default {
    name: 'QuickSetting',
    methods: {
        run: function(action) {
            if(document.getElementById('ts_app_iframe')) {
                let iframe = document.getElementById('ts_app_iframe')
                iframe.contentWindow.postMessage('{"event":"command","func":"' + action + 'Video","args":""}', '*');
            }
        }
    }
}
</script>
<style scoped>
    .ts-ext-quick-setting {
        padding: 8px;
        text-align: center;
    }

    .ts-ext-quick-setting span {
        font-size: 20px;
        margin-right: 5px;
        color: #DD5542;
        cursor: pointer;
    }

    .ts-ext-quick-setting span:hover {
        color: #333;
    }
</style>
