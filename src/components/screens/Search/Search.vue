<template>
    <div class="ts-ext-search">
        <div class="ts-ext-form">
            <input type="text" ref="keyword" v-model="keyword" v-on:keyup.enter="search(keyword, null)">
            <button @click="search(keyword, null)">{{ this.$t("search.search") }}</button>
        </div>
        <div class="ts-ext-list ts-ext-content" ref="list_content">
            <ul>
                <VideoItem v-on:watchVideo="watchVideo" v-bind:video="video" v-bind:key="key" v-for="(video, key) in videos"></VideoItem>
            </ul>
            <div class="ts-ext-pagination" v-if="pageInfo">
                <span @click="search(keywordUse, pageInfo.prevPageToken)" v-if="typeof pageInfo.prevPageToken != 'undefined'">
                    {{ this.$t("search.prev") }}
                </span>
                <span @click="search(keywordUse, pageInfo.nextPageToken)" v-if="typeof pageInfo.nextPageToken != 'undefined'">
                    {{ this.$t("search.next") }}
                </span>
            </div>
        </div>
        
    </div>
</template>
<script>
import { getVideo } from '../../../services/youtube.service';
import VideoItem from './VideoItem.vue';

export default {
    name: 'Search',
    data: () => {
        return {
            keyword: '',
            keywordUse: '',
            videos: [],
            pageInfo: null,
            videoWatch: null
        }
    },
    created: function() {
    },
    components: {
        VideoItem
    },
    methods: {
        search(keyword, token) {
            if(keyword == "") {
                return
            }
            this.$store.commit('setTitle', { title: 'Search with ' + keyword })
            this.$store.commit('setKeyword', { keyword: keyword })
            this.keywordUse = keyword
            let _this = this
            getVideo(keyword, token, _this.$store.state.setting.maxResult).then((data) => {
                let { err, results, pageInfo } = data
                _this.pageInfo = pageInfo
                _this.videos = results
                _this.videoWatch = null
                _this.$refs.list_content.scrollTop = 0
            })
        },
        watchVideo(video) {
            this.$emit('watch_video', video)
        }
    }
}
</script>
<style scoped>
    .ts-ext-search {
        height: 360px;
    }

    .ts-ext-search .ts-ext-form {
        padding: 15px;
        overflow: hidden;
        box-sizing: content-box;
    }

    .ts-ext-search .ts-ext-form input {
        width: calc(100% - 100px);
        float: left;
        border: 1px solid #ccc;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 0px;
        line-height: initial;
        margin: 0px;
    }

    .ts-ext-search .ts-ext-form input:focus {
        outline: none;
        box-shadow: none;
    }

    .ts-ext-search .ts-ext-form button {
        width: 75px;
        float: left;
        background: #DD5542;
        border: none;
        height: 30px;
        color: #FFF;
        border-radius: 0px;
        font-size: 11px;
        box-shadow: none;

    }

    .ts-ext-search .ts-ext-form button:focus {
        outline: none;
    }

    .ts-ext-search .ts-ext-list {
        height: 300px;
    }

    .ts-ext-search .ts-ext-list ul {
        padding: 0px;
        margin: 0px;
        list-style: none;
    }

    .ts-ext-search .ts-ext-list ul li {
        padding: 15px;
        border-bottom: 1px solid #ccc;
    }

    .ts-ext-search .ts-ext-list .ts-ext-pagination {
        padding: 10px 10px;
        overflow: hidden;
        text-align: center;
    }

    .ts-ext-search .ts-ext-list .ts-ext-pagination span {
        cursor: pointer;
        background: #333;
        color: #FFF;
        padding: 5px 15px;
        display: inline-block;
        border: 2px solid #333;
    }

    .ts-ext-search .ts-ext-list .ts-ext-pagination span:hover {
        background: #FFF;
        color: #333;
    }
</style>
