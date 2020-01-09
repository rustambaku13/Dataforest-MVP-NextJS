import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useProtectedRoute from '../hooks/useProtectedRoute';
import TopHeader from '../components/TopHeader';
import { Card, Drawer, Row, Col, Input, Form, Button, List, Avatar, Icon } from 'antd';
import { getDiscussions, createDiscussion } from '../services/discussions';
import { formatDate } from '../helpers/dateFormat';
import ReactQuill from "react-quill";
import '../static/styles/feed.scss';

const FormItem = Form.Item;
const ListItem = List.Item;

function Feed(props) {
  const [discussions, setDiscussions] = useState(props.discussions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const Router = useRouter();
  useProtectedRoute(auth => !auth);

  const { getFieldDecorator, getFieldsValue, validateFields } = props.form;

  async function submit(e) {
    e.preventDefault();

    validateFields(async function (err) {
      if (!err) {
        setIsSubmitting(true);
        try {
          const { title, content } = getFieldsValue();
          const data = await createDiscussion({ title, core: content, category: 'Learn' });
          setDiscussions(prev => [data, ...prev]);

          setIsSubmitting(true);
          setDrawerOpen(false);
        }
        catch (e) {
          setIsSubmitting(false);
          throw e;
        }
      }
      else {
        console.log({ err });
      }
    });

    console.log(getFieldsValue());
  }

  function upvote(e) {
    e.stopPropagation();
    console.log('upvoted!');
  }

  function renderDiscussions() {
    return (
      <List
        dataSource={discussions}
        itemLayout="horizontal"
        renderItem={item => (
          <ListItem key={item.id} style={{ paddingLeft: 15, paddingRight: 15 }} onClick={() => Router.push(`/feed/${item.id}`)}>
            <a className="upvote" onClick={upvote}>
              <Icon type="caret-up" />
              <h3>{item.upvotes_number}</h3>
            </a>
            <Avatar className="avatar" shape="square" src={item.author.profile_pic} />
            <div className="discussion-title">
              <h3>{item.title}</h3>
              <span>
                <Link href={`/user/${item.author.id}`}>
                  <a>{item.author.first_name} {item.author.last_name}</a>
                </Link> {formatDate(item.created_at)} ago
              </span>
            </div>
          </ListItem>
        )}
      />
    )
  }

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
          {discussions.length ? renderDiscussions() : 'No discussion posted yet!'}
        </Card>
      </div>
      <Drawer
        title="Create New Discussion"
        width={window.innerWidth > 720 ? 720 : "100%"}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        maskClosable={true}
        visible={drawerOpen}
        className="create-discussion-drawer"
      >
        <Form layout="vertical" hideRequiredMark onSubmit={submit}>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Topic Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please provide the topic title!' }],
                  initialValue: ''
                })(
                  <Input placeholder="Title here..." />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormItem label="Content">
                {getFieldDecorator('content', {
                  rules: [{ required: true }],
                  initialValue: ''
                })(
                  <ReactQuill name="content" style={{ minHeight: 200 }} />
                )}
              </FormItem>
            </Col>
          </Row>
          <div className="drawer-submit">
            <Button style={{ marginRight: 8 }} onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>Create</Button>
          </div>
        </Form>
      </Drawer>
    </>
  )
}

Feed.getInitialProps = async () => {
  const discussions = await getDiscussions({ category: 'Learn' });
  return { discussions };
}

export default Form.create()(Feed);