import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Navigation from '../components/Navigation';
import store from '../store';
import 'antd/dist/antd.css';
import '../static/styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="stylesheet" href="/static/css/style.css" />
        <link rel="stylesheet" href="/static/css/themify-icons.css" />
      </Head>

      <Navigation />
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // call getInitialProps if any
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}

export default MyApp;