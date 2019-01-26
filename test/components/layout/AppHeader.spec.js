import { expect } from 'chai'
import AppHeader from '../../../src/components/layout/AppHeader.vue'
import { RenderShallowMount } from '../../services/component.test'

describe('AppHeader.vue', () => {
    it('emitted when click show button', () => {
        const wrapper = RenderShallowMount(AppHeader)
        wrapper.find('.ts-ext-header-btn-show').trigger('click')
        expect(wrapper.emitted('change_is_show')).to.not.be.undefined
    })

    it('change locale when click language button', () => {
        const wrapper = RenderShallowMount(AppHeader)
        wrapper.find('.ts-ext-header-btn-lang').trigger('click')
        expect(wrapper.find('.ts-ext-header-btn-lang').text()).contains('VI')
    })
})