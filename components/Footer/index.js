import Link from 'next/link';
import './style.scss';

export default () => (
  <footer className="footer-area">
    <div className="container" style={{ margin: '0 auto' }}>
      <div className="row">
        <div className="single-footer-widget">
          <img uk-scrollspy="cls: uk-animation-fade; delay: 500" className="footer-logo" src="/static/assets/logo2.png" height={100} /> <br />
          <div uk-scrollspy="target: >*;cls: uk-animation-fade; delay: 1000" className="footer-have-acc text-white "><span className="mr-1">Have an account?</span><Link href="Login"><a href="/login">Sign In</a></Link>       </div>
        </div>
        <div className="single-footer-widget">
          <h4>About Us</h4>
          <p>Be a part of a green AI community. Crowdsource your data, participate in discussions, sell your models, upload your datasets and much more ...</p>
          {/* <div class="footer-logo">
                        <img src="{% static "js/bootstrap.min.js" %}"   src="img/logo.png" alt="">
                    </div> */}
        </div>
        <div className="single-footer-widget">
          <h4>Contact Info</h4>
          <div className="footer-address">
            <p>Address :Baku, Azerbaijan</p>
            <span>Phone : +905338418625</span>
            <span>Email : info@data-forest.ai</span>
          </div>
        </div>
        <div className="single-footer-widget">
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
    <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
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