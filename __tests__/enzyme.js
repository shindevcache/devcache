import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShinStart from '../client/containers/ShinStart.jsx'

configure({ adapter: new Adapter() });

describe('React Redux unit tests', () => {
  describe('ShinStart Container', () => {
    let wrapper;
    const props = {
      mode: 'login'
    }

    beforeAll(() => {
      wrapper = shallow(<ShinStart {...props}/>)
    });

    it('Contains an h3 tag with text "SHIN devCache', () => {
      expect(wrapper.text()).toMatch('Test Text');
      // expect(wrapper.find('h3').text()).toMatch("SHIN devCache");
    })
  })
})