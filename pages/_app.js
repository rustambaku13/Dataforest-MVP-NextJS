import React from 'react';
import Head from 'next/head';
import { ImportLink, ImportJS } from '../views/snippet';

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    <>
      <Head>
        <ImportLink />
        <ImportJS />
      </Head>

      <Component {...pageProps} />
      <style jsx global>{`
      body {
        background-image: url("/static/assets/forest_bg_1.jpg");
        background-repeat: no-repeat;
        background-size: contain;
      }
    `}</style>
    </>
    // </Provider>
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