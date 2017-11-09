import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './NotFoundPage';

it('renders welcome message', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});