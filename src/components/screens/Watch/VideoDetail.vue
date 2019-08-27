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
            <span @click="getUrl()">
                 <font-awesome-icon icon="link" />
            </span>
            <template v-if="message != ''">
                <span class="ts-ext-notice" v-if="message == 'copied'">{{ $t('watch.copied') }}</span>
                <span class="ts-ext-notice" v-if="message == 'saved'">{{ $t('watch.saved') }}</span>
                <span class="ts-ext-notice" v-if="message == 'had_exists'">{{ $t('watch.had_exists') }}</span>
            </template>
        </div>
        <div class="ts-ext-input-url">
            <input v-bind:value="'https://www.youtube.com/watch?v='+video.id" ref="videoUrl" type="text">
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
    data: () => {
        return {
            message: ''
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
            pushSaveVideo(this.$chrome, this.video).then(function (result) {
                _this.$store.commit('setSaveVideo', { saveVideo: result })
                _this.message = 'saved'
            }).catch(function (error) {
                if(error.error == 'is_exists') {
                    _this.message = 'had_exists'
                }
            })
        },
        watchVideo(video) {
            this.message = ''
            this.video = video
        },
        getUrl() {
            this.message = 'copied'
            this.$refs.videoUrl.select()
            document.execCommand('copy')
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
        box-sizing: content-box;
        padding: 15px;
        height: 330px;
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

    .ext-detail .ts-ext-input-url {
        height: 1px;
        overflow: hidden;
    }

    .ext-detail .ts-ext-input-url input[type="text"] {
        opacity: 0; 
        height: 1px; 
        overflow: hidden
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
        box-sizing: content-box;
    }

    .ext-detail .ts-ext-detail-btn span.ts-ext-notice {
        background: #FFF;
        border: none;
        color: #DD5542;
        font-style: italic;
    }

    .ext-detail .ts-ext-detail-btn span:hover {
        background: #FFF;
        color: #333;
    }
</style>
