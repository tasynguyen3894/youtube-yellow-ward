import { expect } from 'chai'
import User from '../../../../src/components/screens/User/User.vue'
import { RenderShallowMount } from '../../../services/component.test'

describe('User.vue', () => {
    it('active button when click', () => {
        const wrapper = RenderShallowMount(User)
        let li = wrapper.findAll('.ts-ext-tabs ul li').at(1)
        li.trigger('click')
        expect(li.classes('active')).to.be.true
    })

    it('change tab when click button', () => {
        const wrapper = RenderShallowMount(User)
        let li = wrapper.findAll('.ts-ext-tabs ul li').at(1)
        let tab = wrapper.findAll('.ts-ext-tab-content').at(1)
        li.trigger('click')
        expect(tab.element.style.display == 'none').to.be.false
    })
})