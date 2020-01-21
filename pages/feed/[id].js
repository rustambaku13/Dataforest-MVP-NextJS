import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { getDiscussionByID, getDiscussionComments } from '../../services/discussions';
import { Card, Icon } from 'antd';
import FeedComments from '../../components/FeedComments';
import './style.scss';

const LoadingIcon = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Icon type="loading" style={{ fontSize: 24 }} />
  </div>
);

function Discussion({ discussion }) {
  console.log({ discussion })
  const Router = useRouter();
  const { id } = Router.query;

  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  useProtectedRoute(auth => !auth);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    try {
      const data = await getDiscussionComments({ id });
      setComments(data);
      setIsLoadingComments(false);
    }
    catch (e) {
      throw e;
    }
  }

  function upvote(e) {
    e.stopPropagation();
    console.log('upvoted!');
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
      </Head>
      <div className="discussion-thread">
        <Card
          title={discussion.title}
          extra={
            <a className="upvote" onClick={upvote}>
              <Icon type="caret-up" />
              <h3>{discussion.upvotes_number}</h3>
            </a>
          }
          style={{ marginBottom: '3rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: discussion.core }} />
        </Card>
        {isLoadingComments ? <LoadingIcon /> : <FeedComments comments={comments} />}
      </div>
    </>
  )
}

Discussion.getInitialProps = async ({ query }) => {
  const { id } = query;
  const discussion = await getDiscussionByID(id);
  return { discussion };
}

export default Discussion;