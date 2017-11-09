import React from 'react';
import { shallow } from 'enzyme';
import App from './routes';

it('renders without crashing', () => {
  shallow(<App />);
});