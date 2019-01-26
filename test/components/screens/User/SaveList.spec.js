import { expect } from 'chai'
import SaveList from '../../../../src/components/screens/User/SaveList.vue'
import { RenderShallowMount } from '../../../services/component.test'

describe('SaveList.vue', () => {
    it('remove saved', () => {
        const wrapper = RenderShallowMount(SaveList)
        let firstSaveList = wrapper.findAll('.ts-ext-save-list ul li').length
        let span = wrapper.find('.ts-ext-delete')
        span.trigger('click')
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.ts-ext-save-list ul li').length).to.be.true
            done()
        })
        
    })
})