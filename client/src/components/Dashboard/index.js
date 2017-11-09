import React from 'react'

import Header from './Header';
import Content from './routes';
import Footer from './Footer';

export default ({ children }) => (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
);

