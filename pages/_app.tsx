import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';
import { ContextProvider } from '../src/context/Context';
import Layout from '../src/layouts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Fragment>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/svg/favicon.svg' />
          <meta
            name='description'
            content='Portfolio for Brandon Bowen, a Full-Stack software engineer based in Corona, CA, specializing in building scalable enterprise applications with .NET, React, and Python. Available for contract, freelance projects and full-time opportunities.'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='robots' content='index, follow' />
          <meta
            name='google-site-verification'
            content='C4CjLzj7j9qMsKKZ4E0W4AxpsHWED17IYeQ8hgelrN0'
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </ContextProvider>
  );
}

export default MyApp;
