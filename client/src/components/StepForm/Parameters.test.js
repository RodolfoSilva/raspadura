import React from 'react';
import { shallow } from 'enzyme';
import Parameters from './Parameters';

describe('Parameters', () => {
  it('render empty', () => {
    const wrapper = shallow(<Parameters fields={[]} meta={{ error: null }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with values', () => {
    const fields = [
      { name: 'code', value: '1324564' }
    ];
    const wrapper = shallow(<Parameters fields={fields} meta={{ error: null }} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('add a new field', () => {
    const fields = [
      { name: 'code', value: '1324564' }
    ];
    const wrapper = shallow(<Parameters fields={fields} meta={{ error: null }} />);

    wrapper.find('button').first().simulate('click');
    expect(fields).toHaveLength(2);

    wrapper.instance().forceUpdate();
    expect(wrapper.update()).toMatchSnapshot();
  });
});