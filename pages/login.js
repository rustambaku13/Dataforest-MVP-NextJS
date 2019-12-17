import React from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import { MenuBar } from '../views/snippet';

function Login() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Dataforest: Your Single Venue for the Data that you need!</title>
        <meta name="description" content="Dataforest your data marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/static/css/login.css" />
      </Head>
      {/* <MenuBar isAuthenticated={false} /> */}
      <div style={{margin: 0}} className="row">
        <div style={{padding: 0}} className="container">
          <div className=" row login-container">
            {'{'}/* <div className="col-md-4 login-slider ">
              <div style={{height: '100%'}} className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">Slide 1</div>
                  <div className="swiper-slide">Slide 2</div>
                  <div className="swiper-slide">Slide 2</div>
                </div>
                <div className="swiper-pagination" />
              </div>
            </div> */{'}'}
            <div className="col-md-12 login-form">
              <a href="/"><img src="/static/assets/LOGO2.png" height={70} className="img-center mt-3" /></a>
              <form action="#" method="POST" className="row col-md-10 offset-md-1 mt-5">
                {'{'}/* {'{'}% csrf_token %{'}'} */{'}'}
                <div className="form-group mb-5 col-12">
                  <label style={{color: 'white'}} htmlFor="exampleInputPassword1">{'{'}/*{'{'} form.username.label {'}'}*/{'}'}</label>
                  {'{'}/*{'{'} form.username {'}'}*/{'}'}
                  <small className="form_error">{'{'}/*{'{'} form.username.errors {'}'}*/{'}'}</small>
                </div>
                <div className="form-group mb-5 col-12">
                  <label style={{color: 'white'}} htmlFor="exampleInputPassword1">{'{'}/*{'{'} form.password.label {'}'}*/{'}'}</label>
                  {'{'}/*{'{'} form.password {'}'}*/{'}'}
                  <small className="form_error">{'{'}/*{'{'} form.email.errors {'}'}*/{'}'}</small>
                </div>
                <small style={{fontSize: '1.1em'}}><a href="#">Forgot your password ?</a></small>
                <div className="col-12">
                  <div style={{width: '100%'}} className="mb-3 mt-3">
                    <input type="submit" defaultValue="LOG IN" className="dataforest_button_success  uk-button" />
                  </div>
                  <small className="mt-3" style={{fontSize: '1.2em', color: 'white'}}>Don't have an account? <a href="/signup">SIGN UP</a></small>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      {/* <script>
        var swiper = new Swiper('.swiper-container', {
          pagination: {
          el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });
        </script> */}
    </>
  )
}

export default Login;