import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import useProtectedRoute from '../hooks/useProtectedRoute';
import TopHeader from '../components/TopHeader';
import { Card, Drawer, Row, Col, Input, Form } from 'antd';
import { getDiscussions } from '../services/discussions';
import ReactQuill from "react-quill";
import '../static/styles/feed.scss';

function Feed({ discussions }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [description, setDescription] = useState('');
  const { authUser } = useSelector(state => state.sessionState);
  useProtectedRoute(auth => !auth);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
      </Head>
      <TopHeader />
      <div className="discussion-threads">
        <Card
          title={'Discussion Threads'}
          extra={<a onClick={() => setDrawerOpen(true)}>New Discussion</a>}
        >
          {discussions.length ? 'there is sth' : 'No discussion posted yet!'}
        </Card>
      </div>
      <Drawer
        title="Create New Discussion"
        width={window.innerWidth > 720 ? 720 : "100%"}
        placement="right"
        onClose={() => setTimeout(() => setDrawerOpen(false))}
        maskClosable={true}
        visible={drawerOpen}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Input placeholder="Topic Title" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <ReactQuill
                name="description"
                value={description}
                onChange={setDescription}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

Feed.getInitialProps = async () => {
  const discussions = await getDiscussions({ category: 'Learn' });
  console.log({ discussions });
  return { discussions };
}

export default Feed;