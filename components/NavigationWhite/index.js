import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout, Button, Avatar, Drawer, Menu, Dropdown, Row,Col, Icon } from 'antd';
import cookie from 'js-cookie';
import AuthRender from '../../components/AuthRender';
import { setAuthUser } from '../../actions';
import './style.scss';
const {SubMenu} = Menu;
const { Header } = Layout;
const { Item } = Menu;

function NavigationWhite() {
  const { authUser } = useSelector(state => state.sessionState);
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const Router = useRouter();
  
  function logout() {
    cookie.remove('token');
    axios.defaults.headers.common = null;
    dispatch(setAuthUser(null));
  }  
  const menuOverlay = () => (    <Menu style={{ display: 'flex', flexDirection: 'column', fontSize: 18 }}>
      <p style={{ fontSize: 18, padding: '5px 12px', margin: 0, fontWeight: 'bold' }}>{authUser.first_name} {authUser.last_name}</p>
      <Item key="profile"><Link href="/user/[id]`" as={`/user/${authUser.id}`}>Profile</Link></Item>
      <Item  key="setting"><Link href='/settings'>Settings</Link></Item>
      <Item  key="topup"><Link href="/top-up">Top-Up</Link></Item>
      <Item  key="logout" onClick={logout}><Link href='/'>Log out</Link></Item>
    </Menu>
  )
  const rendersAuth = () => (  <>
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
  const renderAuth = ()=>(   <>
            <Row type='flex'  align='middle' className="items">
                <Menu mode='horizontal'>
                    <Item><Link href='/'><a>Feed</a></Link></Item>
                    <Item><Link href='/tasks'><a>Tasks</a></Link></Item>
                    <Item><Link href='/datasets'><a>Datasets</a></Link></Item>
                    <Item><Link href='/feed'><a>Discussions</a></Link></Item>                                        
                </Menu>              
            </Row>
            <Row type='flex'  align='middle' className="action">
                <div className="cutter"></div>
                <div style={{"marginLeft":"auto"}}>
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
                </div>                           
            </Row>
            <Col className="expand-button">
                <a onClick={()=>{setMenuVisible(!menuVisible)}} href="#"><Icon type="menu"/></a>
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
            </Col>

        </>
  );
  const renderNonAuth = ()=>(       <>
            <Row type='flex'  align='middle' className="items">
                <Menu mode='horizontal'>
                    <Item><Link href='/tasks'><a>Tasks</a></Link></Item>
                    <Item><Link href='/datasets'><a>Datasets</a></Link></Item>
                    <Item><Link href='/feed'><a>Discussions</a></Link></Item>
                    <Item><Link href='/contact'><a>About Us</a></Link></Item>
                    <Item><Link href='/about'><a>Contacts</a></Link></Item>                    
                </Menu>
              

            </Row>
            <Row type='flex'  align='middle' className="action">
                <div className="cutter"></div>
                <div style={{"marginLeft":"auto"}}>
                    <Link href='/signup'><a><Button className="circular-button" >Create Account</Button></a></Link>
                    <span style={{"marginLeft":"1rem",color:"white"}}>Or</span>
                    <Link href="/login"><a><Button  style={{fontWeight:"600"}} className="text" type='link'>Login</Button></a></Link>
                </div>                                    
            </Row>
            <Col className="expand-button">
                <a onClick={()=>{setMenuVisible(!menuVisible)}} href="#"><Icon type="menu"/></a>
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
            </Col>

        </>
    ); 
  return(
      <Layout>
          <Header style={{padding:"0"}} className="nav-header">
                <Row style={{width:"100%",alignItems:"stretch",height:"100%"}} type='flex' align='middle'>
                    
                    <Col className="logo">
                        <Link href="/"><a><img style={{"margin":"auto"}} src="/static/assets/dataforest_logo_blue.png" height={40} alt="Dataforest"/></a></Link>
                    </Col>
                    <AuthRender
                        renderAuth={renderAuth}
                        renderNonAuth={renderNonAuth}
                        />
                </Row>                               
          </Header>         
          
      </Layout>
  )
}

const avatarStyle = {
  cursor: "pointer",
  margin: "0 0.7em",
  color: 'white',
  background: 'transparent'
}

export default NavigationWhite;