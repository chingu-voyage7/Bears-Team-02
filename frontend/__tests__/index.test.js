import React from 'react'
import { shallow } from 'enzyme'
import Index from '../pages/index'

test('', () => {
  const index = shallow(<Index />)
  expect(index.text()).toEqual('Hello 👋')
})
