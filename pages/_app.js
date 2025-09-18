import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';
import { ContextProvider } from '../src/context/Context';
import Layout from '../src/layouts/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Fragment>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='img/favicon.ico' />
          <meta
            name='description'
            content='Portfolio of Brandon Bowen, a full-stack developer specializing in JavaScript, React, and Node.js. Showcasing projects in front-end, back-end, and full-stack development.'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='robots' content='index, follow' />
          <script
            src='https://www.google.com/recaptcha/api.js'
            async
            defer></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </ContextProvider>
  );
}

export default MyApp;
