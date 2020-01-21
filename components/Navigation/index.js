import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout, Button, Avatar, Drawer, Menu, Dropdown } from 'antd';
import cookie from 'js-cookie';
import AuthRender from '../../components/AuthRender';
import { setAuthUser } from '../../actions';
import './style.scss';

const { Header } = Layout;
const { Item } = Menu;

function Navigation() {
  const { authUser } = useSelector(state => state.sessionState);
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const Router = useRouter();

  function logout() {
    cookie.remove('token');
    axios.defaults.headers.common = null;
    dispatch(setAuthUser(null));
  }

  const fontStyle = { fontSize: 18 }

  const menuOverlay = () => (
    <Menu style={{ display: 'flex', flexDirection: 'column', fontSize: 18 }}>
      <p style={{ fontSize: 18, padding: '5px 12px', margin: 0, fontWeight: 'bold' }}>{authUser.first_name} {authUser.last_name}</p>
      <Item style={fontStyle} key="profile"><Link href="/user/[id]`" as={`/user/${authUser.id}`}>Profile</Link></Item>
      <Item style={fontStyle} key="setting"><Link href='/settings'>Settings</Link></Item>
      <Item style={fontStyle} key="topup"><Link href="/top-up">Top-Up</Link></Item>
      <Item style={fontStyle} key="logout" onClick={logout}><Link href='/'>Log out</Link></Item>
    </Menu>
  )

  const renderAuth = () => (
    <>
      <ul className="header-menu">
        <li className="nav-item"><Link href='/'><a className="nav-link">Home</a></Link></li>
        <li className="nav-item"><Link href='/feed'><a className="nav-link">Feed</a></Link></li>
        <li className="nav-item"><Link href='/tasks'><a className="nav-link">Tasks</a></Link></li>
        <li className="nav-item"><Link href='#'><a className="nav-link">Datasets</a></Link></li>
        <li className="nav-item"><Link href='#'><a className="nav-link">Models</a></Link></li>
        <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown
            overlay={menuOverlay()}
            trigger={['click']}
            placement="bottomRight"
          >
            <div style={{ marginRight: 24 }}>
              <Avatar shape="square" src={authUser.profile_pic} style={{
                cursor: "pointer",
                margin: "0 0.7em"
              }} />
            </div>
          </Dropdown>
          <a className="dataforest-coin" href='#'>
            <label style={{ marginRight: 10 }}>{authUser.money.toFixed(2)}</label>
            <img src="/static/fonts/coins-solid.svg" />
          </a>
        </li>
      </ul>
      <div className="header-menu-icon">
        <Dropdown
          overlay={menuOverlay()}
          trigger={['click']}
          placement="bottomRight"
        >
          <div style={{ marginRight: 24 }}>
            <Avatar shape="square" src={authUser.profile_pic} style={{
              cursor: "pointer",
              margin: "0 0.7em"
            }} />
          </div>
        </Dropdown>
        <a className="dataforest-coin" href='#'>
          <label style={{ marginRight: 10 }}>{authUser.money.toFixed(2)}</label>
          <img src="/static/fonts/coins-solid.svg" />
        </a>
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
            <Item><Link href='/feed'><a>Feed</a></Link></Item>
            <Item><Link href='/tasks'><a>Tasks</a></Link></Item>
            <Item><Link href='/datasets'><a>Datasets</a></Link></Item>
            <Item><Link href='/models'><a>Models</a></Link></Item>
          </Menu>
        </Drawer>
      </div>
    </>
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
        <ul style={{ marginBottom: 0 }}>
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
      <Header className="nav-header" style={{ background: '#3C3C40' }}>
        <div className="title">
          <Link href="/">
            <a className="navbar-brand logo_h">
              <img src="/static/assets/LOGO2.png" height={60} alt="Dataforest" />
            </a>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <AuthRender
            renderAuth={renderAuth}
            renderNonAuth={renderNonAuth}
          />
        </div>
      </Header>
      <style scoped>
        {`
        ul.header-menu {
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
        .header-menu a {
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