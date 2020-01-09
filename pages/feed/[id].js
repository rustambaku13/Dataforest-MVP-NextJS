import React, { useState } from 'react';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import { getDiscussionByID } from '../../services/discussions';
import { Card, Icon } from 'antd';
import './style.scss';

function Discussion({ discussion }) {
  console.log({ discussion })
  useProtectedRoute(auth => !auth);

  function upvote(e) {
    e.stopPropagation();
    console.log('upvoted!');
  }

  return (
    <>
      <div className="discussion-thread">
        <Card
          title={discussion.title}
          extra={
            <a className="upvote" onClick={upvote}>
              <Icon type="caret-up" />
              <h3>{discussion.upvotes_number}</h3>
            </a>
          }
        >
          <div dangerouslySetInnerHTML={{ __html: discussion.core }} />
        </Card>
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