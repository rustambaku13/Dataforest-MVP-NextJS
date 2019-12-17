import React from 'react';
import Link from 'next/link';

export const ImportLink = () => (
  <>
    <link rel="stylesheet" href="/static/css/bootstrap-grid.min.css" />
    <link rel="stylesheet" href="/static/css/bootstrap-reboot.min.css" />
    <link rel="stylesheet" href="/static/css/uikit.css" />
    <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/css/style.css" />
    <link rel="stylesheet" href="/static/css/swiper.min.css" />
    <link rel="stylesheet" href="/static/css/themify-icons.css" />
  </>
)

export const ImportJS = () => (
  <>
    <script src="/static/js/jquery-3.4.1.js"></script>
    <script src="/static/js/uikit.min.js"></script>
    <script src="/static/js/bootstrap.bundle.min.js"></script>
    <script src="/static/js/bootstrap.min.js"></script>
  </>
)

export const MenuBar = ({ user, isAuthenticated }) => (
  <div className="header_area" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="main_menu">
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <Link href="/"><a className="navbar-brand logo_h"><img src="static/assets/logo2.png" height={60} alt="Dataforest" /></a></Link>
          <button className="navbar-toggler navbar-toggler-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon navbar-toggler-icon-white" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          {isAuthenticated ?
            (
              <>
                <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul className="nav navbar-nav menu_nav ml-auto">
                    <li className="nav-item"><Link href='/'><a className="nav-link">Home</a></Link></li>
                    <li className="nav-item"><Link href='/feed'><a className="nav-link">Feed</a></Link></li>
                    <li className="nav-item"><Link href='/tasks'><a className="nav-link">Tasks</a></Link></li>
                    <li className="nav-item"><Link href='#'><a className="nav-link">Datasets</a></Link></li>
                    <li className="nav-item"><Link href='#'><a className="nav-link">Models</a></Link></li>
                  </ul>
                </div>
                <div className="right-button-signed">
                  <a className="log_out" href="#"><img src={`/media/${user.profile_pic}`} /></a>
                  <div uk-dropdown="pos: bottom-justify; mode:click; animation: uk-animation-slide-top-small; duration: 200">
                    <ul className="uk-nav uk-dropdown-nav">
                      <li className="uk-nav-header">{user.first_name} {user.last_name}</li>
                      <li><Link href={`/user/${user.id}`}><a>Profile</a></Link></li>
                      <li><Link href='#'><a>Settings</a></Link></li>
                      <li><Link href='#'><a>Top-Up</a></Link></li>
                      <li><Link href='#'><a>Log Out</a></Link></li>
                    </ul>
                  </div>
                  <a className="ml-3 dataforest-coin" href="#">
                    <label>{Number(user.money).toFixed(2)}</label>
                    <img src="/static/fonts/coins-solid.svg" />
                  </a>
                </div>
              </>
            )
            :
            (
              <>
                <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul className="nav navbar-nav menu_nav ml-auto">
                    <li className="nav-item"><a className="nav-link" href="{% url 'index' %}">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="index.html">Datasets</a></li>
                    <li className="nav-item"><a className="nav-link" href="feature.html">Explore</a></li>
                    <li className="nav-item"><a className="nav-link" href="price.html">About Us</a></li>
                    {/* <li class="nav-item submenu dropdown">
                                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                                        <ul class="dropdown-menu">
                                            <li class="nav-item"><a class="nav-link" href="feature.html">Features</a></li> 
                                            <li class="nav-item"><a class="nav-link" href="price.html">Price</a></li>
                                            <li class="nav-item"><a class="nav-link" href="element.html">Element</a></li>
                                        </ul>
                                    </li> */}
                    <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
                    <li className="nav-item d-xl-none d-lg-none"><a className="nav-link" href="{% url 'login' %}">Sign In</a></li>
                    <li className="nav-item d-xl-none d-lg-none"><a className="nav-link" href="{% url 'signup' %}">Register</a></li>
                  </ul>
                </div>
                <div className="right-button">
                  <ul>
                    <li><Link href="/login"><a className="sign_in">Sign In</a></Link></li>
                    <li><Link href="/signup"><a className="sign_up">Register</a></Link></li>
                  </ul>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  </div>
)

export const Footer = () => (
  <footer className="footer-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
          <img uk-scrollspy="cls: uk-animation-fade; delay: 500" className="footer-logo" src="/static/assets/logo2.png" height={100} /> <br />
          <div uk-scrollspy="target: >*;cls: uk-animation-fade; delay: 1000" className="footer-have-acc text-white "><span className="mr-1">Have an account?</span><Link href="Login"><a href="/login">Sign In</a></Link>       </div>
        </div>
        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
          <h4>About Us</h4>
          <p>Be a part of a green AI community. Crowdsource your data, participate in discussions, sell your models, upload your datasets and much more ...</p>
          {/* <div class="footer-logo">
                        <img src="{% static "js/bootstrap.min.js" %}"   src="img/logo.png" alt="">
                    </div> */}
        </div>
        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
          <h4>Contact Info</h4>
          <div className="footer-address">
            <p>Address :Baku, Azerbaijan</p>
            <span>Phone : +905338418625</span>
            <span>Email : info@data-forest.ai</span>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
          <h4>Important Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="p-3 footer-bottom row align-items-center text-center text-lg-left no-gutters">
      <p className="footer-text m-0 col-lg-8 col-md-12">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        Copyright © All rights reserved
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
      <div className="col-lg-4 col-md-12 text-center text-lg-right footer-social">
        <a href="#"><i className="ti-facebook" /></a>
        <a href="#"><i className="ti-twitter-alt" /></a>
        <a href="#"><i className="ti-dribbble" /></a>
        <a href="#"><i className="ti-linkedin" /></a>
      </div>
    </div>
  </footer>
)