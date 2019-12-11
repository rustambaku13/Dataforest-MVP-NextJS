import React from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import { MenuBar, ImportJS, Footer } from '../views/snippet';

const Home = () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>Dataforest: Your Single Venue for the Data that you need!</title>
      <meta name="description" content="Dataforest your data marketplace " />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <MenuBar isAuthenticated={false} />
    <section className="home_banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6 col-xl-5 offset-xl-7">
              <div className="banner_content">
                <h3 style={{ color: 'ghostwhite' }}>Collect Data &amp;<br />Sell your data</h3>
                <p style={{ color: 'ghostwhite' }}>In Dataforest you can find any kind of data, just by creating personalized task &amp; Sell your data by creating your own Data Tree </p>
                <Link href='/tasks'><a className="banner_btn">Start Now<span className="ti-arrow-right" /></a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="offer">
      <div className="container">
        <div className="section-intro mt-5  text-center">
          <h2 className="section-intro__title">What we offer?</h2>
          <p className="section-intro__subtitle">Dataforest offers you a Unique platform where you can order any kind of data for your personalized needs &amp; provides a way to sell your data in a fun way to earn money.</p>
        </div>
        <div className="container">
          <div uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500" className="row">
            <div className="col-lg-4">
              <div className="card card-feature text-center text-lg-left mb-4 mb-lg-0">
                <span className="card-feature__icon">
                  <i className="ti-star" />
                </span>
                <h3 className="card-feature__title">Personalized Data</h3>
                <p className="card-feature__subtitle">In Dataforest one can post a task to gather any sort of data with any kind of labels alongside. We will prepare and pack the data ready for your usage. </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-feature text-center text-lg-left mb-4 mb-lg-0">
                <span className="card-feature__icon">
                  <i className="ti-check" />
                </span>
                <h3 className="card-feature__title">Intuitive Design</h3>
                <p className="card-feature__subtitle">Our goal in Dataforest is to minimize your headache while collecting data for your projects. Our Website and App are made increadibly easy-to-use for that purpose.
                    </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-feature text-center text-lg-left mb-4 mb-lg-0">
                <span className="card-feature__icon">
                  <i className="ti-money" />
                </span>
                <h3 className="card-feature__title">Make Money</h3>
                <p className="card-feature__subtitle">Dataforest provides you an Interactive &amp; Fun way to sell your data and make money. Also you can join our team of Data Validators and start earning on validating data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="logo_line_horizontal"></div>
          <section class="motto_section container">
              
              <h1 class="motto text-center">Your Single Venue for all the Data that you need!</h1>
          </section>
          <div class="logo_line_horizontal"></div> */}
      <section style={{ boxShadow: '0 2px 12px rgba(0,0,0,1)' }} className="feature-area area-padding bg_one">
        <div className="container">
          <div className="row align-items-center">
            <div className="offset-lg-6 col-lg-6">
              <div className="area-heading light">
                <h4>Easy to Use <br />Mobile Application</h4>
                <p>Proceed to our Easy-to-use, Intuitive Application and start building your Data Tree right now!</p>
              </div>
              <div className="row">
                <div className="col-">
                  <div className="single-feature d-flex">
                    <div className="feature-icon" style={{ lineHeight: '113px' }}>
                      <i className="tree" />
                    </div>
                    <div className="single-feature-content">
                      <h5>Build your Data Forest</h5>
                      <p>Data Trees are manifests of your Data. The more data you upload the Larger you forest! The more you label you data the better your trees Grow!</p>
                    </div>
                  </div>
                </div>
                <div className="col-">
                  <div className="single-feature d-flex">
                    <div className="feature-icon" style={{ lineHeight: '113px' }}>
                      <i className="online-shop" />
                    </div>
                    <div className="single-feature-content">
                      <h5>Sell your data</h5>
                      <p>You can sell your data directly to any tasks. Additionaly, our algorithm will automatically gather sellable data from your Data Forest and make you money.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ImportJS />
    </section>
    <style jsx>{`
      body{
        background-image: url("/static/assets/forest_bg_1.jpg");
        background-repeat: no-repeat;
        background-size: contain;
      }
    `}</style>
  </div>
)

export default Home
