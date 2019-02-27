import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { en } from './en.js'
import { vi } from './vi.js'

Vue.use(VueI18n)

const messages = {
    en: en,
    vi: vi
}

// Create VueI18n instance with options
export const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
})