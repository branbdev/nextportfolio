import About from "../src/components/About";
import Contact from "../src/components/Contact";
import Home from "../src/components/Home";
import PortfolioBlock from "../src/components/PortfolioBlock";
import Layout from "../src/layouts/Layout";

const Index = () => {
  return (
    <Layout>
      <Home />
      <About />
      <PortfolioBlock />
      <Contact />
    </Layout>
  );
};

export default Index;
