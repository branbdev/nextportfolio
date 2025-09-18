import { useEffect } from 'react';
import About from '../src/components/About';
import Contact from '../src/components/Contact';
import Home from '../src/components/Home';
import Portfolio from '../src/components/Portfolio';
import Layout from '../src/layouts/Layout';

const Index = () => {
  useEffect(() => {
    document.querySelector('body').classList.add('light');
  }, []);
  return (
    <Layout>
      <Home />
      {/* /Home Section */}
      {/* About Section */}
      <About />
      {/* /About Section */}
      {/* Portfolio Section */}
      <Portfolio />
      {/* /Portfolio Section */}
      {/* Contact Section */}
      <Contact />
      {/* /Contact Section */}
    </Layout>
  );
};

export default Index;
