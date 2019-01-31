<template>
    <div class="ts-ext-header">
        <div class="ts-ext-title" ref="header_title">
            <span v-html="$store.state.title"></span>
        </div>
       <div class="ts-ext-input" ref="header_input">
            <span class="ts-ext-header-btn ts-ext-header-btn-lang" @click="changeLang" v-text="lang == 'vi' ? 'EN': 'VI'">
                
            </span>
            <span class="ts-ext-header-btn ts-ext-header-btn-show" @click="showOrHide" >
                <font-awesome-icon v-bind:icon="is_show ? 'angle-up' : 'angle-down'" />
            </span>
       </div>
    </div>
</template>
<script>
export default {
    name: 'AppHeader',
    props: {
        is_show: {
            default: true
        }
    },
    data: () => {
        return {
            lang: 'vi'
        }
    },
    created() {
        this.lang = this.$i18n.locale
    },
    methods: {
        changeLang() {
            this.lang = this.lang == 'vi' ? 'en' : 'vi';
            this.$i18n.locale = this.lang
        },
        showOrHide() {
            if(this.is_show && this.$store.state.setting.pasueWhenHide == true) {
                if(document.getElementById('ts_app_iframe')) {
                    let iframe = document.getElementById('ts_app_iframe')
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            this.$emit('change_is_show', !this.is_show)
        },
    }
}
</script>
<style scoped>
    .ts-ext-header {
        text-align: center;
        padding: 5px;
        color: #FFF;
        background: #DD5542;
        overflow: hidden;
    }

    .ts-ext-header .ts-ext-title {
        width: calc(100% - 85px);
        float: left;
        cursor: all-scroll;
    }

    .ts-ext-header .ts-ext-input {
        width: 85px;
        float: right;
        position: relative;
    }

    .ts-ext-header .ts-ext-header-btn-lang {
        width: 20px;
        right: 30px;
    }

    .ts-ext-header > div span {
        display: inline-block;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .ts-ext-header .ts-ext-header-btn:hover {
        background: #FFF;
        color: #DD5542;
    }

    .ts-ext-header .ts-ext-header-btn {
        border: 3px solid #FFF;
        padding: 2px;
        font-size: 10px;
        cursor: pointer;
        position: absolute;
        line-height: normal;
        box-sizing: content-box;
    }

    .ts-ext-header .ts-ext-header-btn-show {
        width: 12px;
        right: 0px;
    }

</style>
