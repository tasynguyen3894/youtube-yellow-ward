<template>
    <div class="ext-detail ts-ext-content" v-if="video">
        <div class="video">
            <iframe id="ts_app_iframe" width="410" height="247" v-bind:src="iframeSource" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="ext-info">
            <h3>{{ video.title }}</h3>
            <h4>{{ video.channelTitle }}</h4>
        </div>
        <div class="ts-ext-detail-btn">
            <span @click="save()">
                 <font-awesome-icon icon="save" />
            </span>
            <!-- <span @click="save()">
                 <font-awesome-icon icon="link" />
            </span> -->
        </div>
    </div>
    <div class="ext-detail ts-ext-content-empty" v-else>
        <h3>{{ this.$t("watch.no_video_playing") }}</h3>
    </div>
</template>
<script>
import { pushSaveVideo } from '../../../services/chrome.service'

export default {
    name: 'VideoDetail',
    props: {
        video: {
            default: null,
            type: Object
        }
    },
    created() {
        
    },
    computed: {
        iframeSource: function () {
            return "https://www.youtube.com/embed/" + this.video.id + "?enablejsapi=1"
        }
    },
    methods: {
        goSearch() {
            this.$store.commit('setTab', { tab: 'search' })
        },
        save() {
            let _this = this
            pushSaveVideo(this.video).then(function (result) {
                _this.$store.commit('setSaveVideo', { saveVideo: result })
            })
        },
        watchVideo(video) {
            this.video = video
        }
    },
    watch: {
        video: {
            handler: 'watchVideo',
            deep: true
        }
    }
}
</script>

<style scoped>
    .ext-detail {
        padding: 15px;
        height: 320px;
    }

    .ext-detail .ext-video {
        text-align: center;
        margin-bottom: 5px;
    }

    .ext-detail .ext-info h3 {
        font-size: 17px;
        margin: 4px 0px;
        font-weight: 700;
    }

    .ext-detail .ext-info h4 {
        font-size: 15px;
        color: #999;
        margin: 2px 0px;
    }

    .ext-detail.ts-ext-content-empty h3 {
        text-align: center;
        font-weight: 700;
        font-size: 17.55px;
        margin-top: 17.55px;
    }

    .ext-detail .ts-ext-detail-btn {
        margin-top: 15px;
    }

    .ext-detail .ts-ext-detail-btn span {
        padding: 5px 10px;
        display: inline-block;
        border: 2px solid #333;
        background: #333;
        color: #FFF;
        min-width: 35px;
        text-align: center;
        cursor: pointer;
    }

    .ext-detail .ts-ext-detail-btn span:hover {
        background: #FFF;
        color: #333;
    }
</style>
