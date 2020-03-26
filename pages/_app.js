import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import axios from 'axios';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';
import Navigation from '../components/Navigation';
import { makestore } from '../store';
import withRedux from "next-redux-wrapper";
import { getUserInfoByToken } from '../services/user';
import { setAuthUser } from '../actions';
import Footer from '../components/Footer';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';
import '../static/styles/style.scss';
import {Menu} from 'antd';
import NavigationWhite from '../components/NavigationWhite';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, store, token }) {
  // Set common header to axios if token is valid
  if (token) {
    axios.defaults.headers.common = { 'Authorization': `Token ${token}` };
  }

  return (
    <Provider store={store}>      
      <Head>
        
        <link rel="stylesheet" href="/static/css/themify-icons.css" />   
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap" rel="stylesheet"/>
        
      </Head>

      <NavigationWhite />      
      <Component {...pageProps} />
      {/* <Footer /> */}
    </Provider>
  )
}

MyApp.getInitialProps = async (props) => {
  const { Component, ctx } = props;
  let pageProps = {};

  const { token } = nextCookie(ctx);

  let data;
  try {
    data = await getUserInfoByToken(token);
  }
  catch (e) {
    data = null;
  }
  ctx.store.dispatch(setAuthUser(data));

  // call getInitialProps if any
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, token: data ? token : null };
}


// MyApp.getInitialProps = async (props) => {
//   const { Component, ctx } = props;
//   let pageProps = {};

//   const { token } = nextCookie(ctx);

//   let data;
//   try {
//     data = await getUserInfoByToken(token);
//   }
//   catch (e) {
//     data = null;
//   }
//   ctx.store.dispatch(setAuthUser(data));

//   // call getInitialProps if any
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps, token: data ? token : null };
// }

export default withRedux(makestore)(MyApp);