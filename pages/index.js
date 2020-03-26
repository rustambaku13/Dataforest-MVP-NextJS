import React from 'react';
import Link from 'next/link';
import Meta from '../components/Meta';
import '../static/styles/index.scss';
import {Finance,Invest,SearchIcon,TaskAdIcon,DataTree,DataForest} from '../components/Icons';
import {Row,Col, Input, Card,Tag,Button,Icon} from 'antd';
const { Search } = Input;
const Home = () => (
  <div>
    <Meta
      title='Dataforest: Your Single Venue for the Data that you need!'
      description='Collect data & Sell your data'
    />
    <section className="banner-section">
      <h1 className="dt-motto-font" style={{textAlign:"center",marginTop:"80px"}}>Your Single Shop for AI demands</h1>
      <Row>
        <Col lg={{span:16,offset:4}}>
          <Search size='large' className="dt-search" placeholder="Search Now"/>
          <div style={{marginTop:"0.5rem"}} className="tags">
            <Tag>Datasets</Tag>
            <Tag>Tasks</Tag>
            <Tag>Discussions</Tag>
            <Tag>Models</Tag>
          </div>
        </Col>
      </Row>                 
      <img className="img-bottom" src="../static/assets/wave.svg" />
    </section>
    <section className="features-section">
        <Row type='flex' justify='center'>
          <Col style={{maxWidth:"700px"}}>
            <h1 style={{textAlign:"center",color:"white",fontSize:"2.4em",fontWeight:"bold"}}>About Dataforest</h1>
            <h2 style={{textAlign:"center",color:"white"}}>Dataforest is a data marketplace that is powered by the crowdsource. Here you can find ready datasets and solutions as well as sell them by contributing to tasks </h2>
          </Col>
        </Row>
        <Row className="cards">
          <Col lg={{span:18,offset:3}}>
            <Row type='flex' justify="space-between">
           <Col  className="card">
                  <Row  align='middle' type="flex">
                      <Col style={{"flex":"0 0 120px",marginRight:"15px"}}>
                        <Invest style={{"width":"100%"}}/>
                      </Col>
                      <Col style={{flex:1,maxWidth:"290px"}}>
                        <h2 style={{"fontFamily":"bold"}}>Earn Money</h2>
                        <p className="text">With Dataforest you can earn money by selling & reselling data, datasets, models through the tasks. Also, You can build your own Data Tree and generate money effortlessly.</p>
                      </Col>
                  </Row>
              </Col>   
                <Col  className="card">
                  <Row  align='middle' type="flex">
                      <Col style={{"flex":"0 0 120px",marginRight:"15px"}}>
                        <SearchIcon style={{"width":"100%"}}/>
                      </Col>
                      <Col style={{flex:1,maxWidth:"290px"}}>
                        <h2 style={{"fontFamily":"bold"}}>Find Data & Solutions</h2>
                        <p className="text">Explore our marketplace for ready datasets, trained AI models and ready solutions in the discussions. </p>
                      </Col>
                  </Row>
              </Col>                 
            </Row>
            <Row  type='flex' justify="space-between">
            <Col style={{marginTop:"30px"}} className="card">
                  <Row  align='middle' type="flex">
                      <Col style={{"flex":"0 0 100px",marginRight:"15px"}}>
                        <TaskAdIcon style={{"width":"100%"}}/>
                      </Col>
                      <Col style={{flex:1,maxWidth:"290px"}}>
                        <h2 style={{"fontFamily":"bold"}}>Create Task</h2>
                        <p className="text">In case if you couldn't find what you need you have the option to create a task and crowdsource it. You can resell the obtained item and make money as well. </p>
                      </Col>
                  </Row>
                </Col>  
                <Col style={{marginTop:"30px"}} className="card">
                  <Row  align='middle' type="flex">
                      <Col style={{"flex":"0 0 120px",marginRight:"15px"}}>
                        <DataTree style={{"width":"100%"}}/>
                      </Col>
                      <Col style={{flex:1,maxWidth:"290px"}}>
                        <h2 style={{"fontFamily":"bold"}}>Automate Earning</h2>
                        <p className="text">All the items in your Data Tree can be set for automated selling. Such way whenever there is suitable task, your data will be dispatched and you will make profit.</p>
                      </Col>
                  </Row>
              </Col>                              
            </Row>            
            <Row type='flex' justify='end'>
              <Button style={{"marginTop":"30px",marginRight:"10px"}} className="circular-button-extra-large">Explore the Forest <Icon type="arrow-right"/></Button>
            </Row>
          </Col>
          
        </Row>  
    </section>
  </div>
)

export default Home
