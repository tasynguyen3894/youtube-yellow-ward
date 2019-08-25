<template>
    <div class="ts-ext-save-list ts-ext-content">
        <ul>
            <li v-for="video in saveList" v-bind:key="video.id">
                <span @click="watchVideo(video)" class="ts-ext-tittle">{{ video.title }}</span>
                <span class="ts-ext-delete" @click="deleteSave(video.id)">
                    <font-awesome-icon icon="trash-alt" />
                </span>
                
            </li>
        </ul>
    </div>    
</template>
<script>
import { deleteSaveVideo } from '../../../services/chrome.service'
import axios from 'axios'

export default {
    name: 'SaveList',
    data: () => {
        return {
        }
    },
    methods: {
        deleteSave(id) {
            let _this = this
            // deleteSaveVideo(this.$chrome, id).then(function (result) {
            //     _this.$store.commit('setSaveVideo', { saveVideo: result })
            // }).catch(function(err) {
            // })

            this.$chrome.storage.local.get(['ts_ext_save_list'], function (result) {
                let dataRemove = []
                if(typeof result['ts_ext_save_list'] == 'undefined')
                    dataRemove = []
                else
                    dataRemove = result['ts_ext_save_list']
    
                dataRemove = dataRemove.filter(function (item) {
                                    return item.id != id
                                });
                _this.$chrome.storage.local.set({ts_ext_save_list: dataRemove}, function (res) {
                });
                // resolve();
                _this.$store.commit('setSaveVideo', { saveVideo: dataRemove })
            });
        },
        watchVideo(video) {
            this.$store.commit('setTab', { tab: 'watch' })
            this.$store.commit('setTitle', { title: video.title })
            this.$store.commit('setCurrentVideo', { id: video.id })
            this.$eventBus.$emit('watch', video)
        }
    },
    computed: {
        saveList() {
            return this.$store.state.saveVideo;
        }
    }
}
</script>
<style scoped>
    .ts-ext-save-list {
        height: 250px;
    }

    .ts-ext-save-list ul {
        list-style: none;
        padding: 5px;
        margin: 0px;
    }

    .ts-ext-save-list ul li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        font-size: 15px;
        overflow: hidden;
    }

    .ts-ext-save-list ul li span {
        display: inline-block;
    }

    .ts-ext-save-list ul li span.ts-ext-tittle {
        cursor: pointer;
        max-width: calc(100% - 25px);
    }

    .ts-ext-save-list ul li span.ts-ext-delete {
        cursor: pointer;
        border: 1px solid #333;
        padding: 3px;
        float: right;
        color: #FFF;
        background: #333;
    }

    .ts-ext-save-list ul li span.ts-ext-delete:hover {
        background: #fff;
        color: #333;
    }

</style>
