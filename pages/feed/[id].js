import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { getDiscussionByID, getDiscussionComments, upvoteDiscussion } from '../../services/discussions';
import { Card, Icon, Avatar } from 'antd';
import FeedComments from '../../components/FeedComments';
import { formatDate } from '../../helpers/dateFormat';
import useUpvote from '../../hooks/useUpvote';
import './style.scss';
import Link from 'next/link';

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

  const [number, color, updateUpvote] = useUpvote(discussion.upvotes_number, discussion.upvoted);

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
    upvoteDiscussion({ id });

    updateUpvote();
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        <title key="title">{discussion.title}</title>
      </Head>
      <div className="discussion-thread">
        <div className="main-discussion">
          <div className="left">
            <div style={{ marginBottom: '1.2rem' }}>
              <Avatar shape="square" src={discussion.author.profile_pic} size={64} />
            </div>
            <Link href={`/user/${discussion.author.id}`}><a>{discussion.author.first_name} {discussion.author.last_name}</a></Link>
          </div>
          <div className="right">
            <Card
              title={(
                <div>
                  <span style={{ fontSize: 24 }}>{discussion.title}</span>
                  <br />
                  <span style={{ fontSize: 14, color: '#bbb' }}>Posted {formatDate(discussion.created_at)} ago</span>
                </div>
              )}
              extra={
                <a className="upvote" onClick={upvote}>
                  <Icon type="caret-up" style={{ color }} />
                  <h3 style={{ color }}>{number}</h3>
                </a>
              }
            >
              <div dangerouslySetInnerHTML={{ __html: discussion.core }} />
            </Card>
          </div>
        </div>
        {isLoadingComments ? <LoadingIcon /> : <FeedComments comments={comments} setComments={setComments} />}
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