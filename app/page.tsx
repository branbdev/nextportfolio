import React, { Fragment } from 'react';
import About from '../src/components/About';
import Contact from '../src/components/Contact';
import Home from '../src/components/Home';
import Portfolio from '../src/components/Portfolio';
import LatestArticles from '../src/components/LatestArticles';

export default async function HomePage() {
  return (
    <Fragment>
      <Home />
      <About />
      <Portfolio />
      <LatestArticles />
      <Contact />
    </Fragment>
  );
}
