import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Layout, Button, Avatar, Drawer, Menu } from 'antd';
import cookie from 'js-cookie';
import AuthRender from '../../components/AuthRender';
import { setAuthUser } from '../../actions';
import './style.scss';

const { Header } = Layout;
const { Item } = Menu;

function Navigation() {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  function logout() {
    console.log('logout')
    cookie.remove('token');
    dispatch(setAuthUser(null));
  }

  const renderAuth = () => (
    <ul className="header-menu">
      <li className="nav-item"><Link href='/'><a className="nav-link">Home</a></Link></li>
      <li className="nav-item"><Link href='/feed'><a className="nav-link">Feed</a></Link></li>
      <li className="nav-item"><Link href='/tasks'><a className="nav-link">Tasks</a></Link></li>
      <li className="nav-item"><Link href='#'><a className="nav-link">Datasets</a></Link></li>
      <li className="nav-item"><Link href='#'><a className="nav-link">Models</a></Link></li>
      <li className="nav-item"><Link href='/'><a className="nav-link" onClick={logout}>Logout</a></Link></li>
    </ul>
  );

  const renderNonAuth = () => (
    <>
      <ul className="header-menu">
        <li className="nav-item"><Link href='/'><a className="nav-link">Home</a></Link></li>
        <li className="nav-item"><Link href='/dataset'><a className="nav-link">Datasets</a></Link></li>
        <li className="nav-item"><Link href='/explore'><a className="nav-link">Explore</a></Link></li>
        <li className="nav-item"><Link href='/about-us'><a className="nav-link">About Us</a></Link></li>
        <li className="nav-item"><Link href='/contact'><a className="nav-link">Contact</a></Link></li>

        <li className="nav-item"></li>
      </ul>
      <div className="nav-sign">
        <ul>
          <li className="nav-item"><Link href='/login'><a className="nav-link">Sign In</a></Link></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link href='/signup'><Button>Register</Button></Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="header-menu-icon">
        <Avatar shape="square" size="large" icon="bars" style={avatarStyle} onClick={() => setMenuVisible(true)} />
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setMenuVisible(false)}
          visible={menuVisible}
        >
          <Menu onClick={() => setMenuVisible(false)} style={{ display: 'flex', flexDirection: 'column' }}>
            <Item><Link href='/'><a>Home</a></Link></Item>
            <Item><Link href='/datasets'><a>Datasets</a></Link></Item>
            <Item><Link href='/explore'><a>Explore</a></Link></Item>
            <Item><Link href='/about-us'><a>About Us</a></Link></Item>
            <Item><Link href='/contact'><a>Contact</a></Link></Item>
            <Item><Link href='/login'><a>Sign In</a></Link></Item>
            <Item><Link href='/signup'><a>Register</a></Link></Item>
          </Menu>
        </Drawer>
      </div>
    </>
  );

  return (
    <Layout>
      <Header className="nav-header">
        <div className="title">
          <Link href="/">
            <a className="navbar-brand logo_h">
              <img src="static/assets/logo2.png" height={60} alt="Dataforest" />
            </a>
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <AuthRender
            renderAuth={renderAuth}
            renderNonAuth={renderNonAuth}
          />
        </div>
      </Header>
      <style scoped>
        {`
        ul {
          display: flex;
          flex-direction: row;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
          flex-wrap: wrap;
        }
        li.nav-item {
          margin-right: 45px;
        }
        a {
          color: white;
        }
        a.nav-link {
          cursor: pointer;
          font: 400 12px/80px "Rajdhani", sans-serif;
          text-transform: capitalize;
          padding: 0px;
          display: inline-block;
          font-size: 18px;
        }
        .ant-layout-header {
          background: rgba(0,0,0,0.5);
        }
        `}
      </style>
    </Layout>
  )
}

const avatarStyle = {
  cursor: "pointer",
  margin: "0 0.7em",
  color: 'white',
  background: 'transparent'
}

export default Navigation;