<template>
    <li class="ts-ext-video-item">
        <img @click="watchVideo(video)" v-bind:src="video.thumbnails.default.url" alt="">
        <div>
            <h4 @click="watchVideo(video)">{{ video.title }} <span style="color: red" v-if="video.id == $store.state.currentVideo">[{{ this.$t("search.playing") }}]</span></h4>
            <h5>{{ video.channelTitle }}</h5>
        </div>
    </li>
</template>
<script>
export default {
    name: 'VideoItem',
    props: {
        video: {
            type: Object,
            required: false
        }
    },
    methods: {
        watchVideo: function(video) {
            this.$store.commit('setTab', { tab: 'watch' })
            this.$store.commit('setTitle', { title: video.title })
            this.$store.commit('setCurrentVideo', { id: video.id })
            this.$emit('watchVideo', video)
        }
    }
}
</script>
<style scoped>
    li.ts-ext-video-item {
        padding: 15px;
        border-bottom: 1px solid #ccc;
    }

    li.ts-ext-video-item img {
        width: 150px;
    }

    li.ts-ext-video-item div {
        width: calc(100% - 170px);
        float: right;
    }

    li.ts-ext-video-item div h4 {
        margin: 5px;
        cursor: pointer;
        font-weight: 700;
        font-size: 15px;
        box-sizing: content-box;
        line-height: normal;
    }

    li.ts-ext-video-item div h5 {
        margin: 3px;
        color: #999;
    }
</style>
