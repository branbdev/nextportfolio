import About from '../src/components/About';
import Contact from '../src/components/Contact';
import Home from '../src/components/Home';
import Portfolio from '../src/components/Portfolio';
import { Fragment } from 'react';

const Index = () => {
  return (
    <Fragment>
      <Home />
      <About />
      <Portfolio />
      <Contact />
    </Fragment>
  );
};

export default Index;
