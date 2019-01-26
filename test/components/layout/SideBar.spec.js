import { expect } from 'chai'
import SideBar from '../../../src/components/layout/SideBar.vue'
import { RenderShallowMount } from '../../services/component.test'

describe('SideBar.vue', () => {
    it('active button when click', () => {
        const wrapper = RenderShallowMount(SideBar)
        let li = wrapper.findAll('.ts-ext-sidebar ul li').at(0)
        li.trigger('click')
        expect(li.classes('active')).to.be.true
    })
})