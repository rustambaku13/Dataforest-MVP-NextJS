import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useProtectedRoute from '../hooks/useProtectedRoute';
import TopHeader from '../components/TopHeader';
import { Card } from 'antd';
import { getDiscussions } from '../services/discussions';
//import '../static/styles/feed.scss';

function Feed() {
  const { authUser } = useSelector(state => state.sessionState);
  useProtectedRoute(auth => !auth);

  React.useEffect(() => {
    console.log({ authUser })
    getDiscussions({ category: 'Learn' });
  }, []);

  return (
    <>
      <TopHeader />
      <div className="discussion-threads">
        <Card
          title={'Discussion Threads'}
        >
          Discussions
        </Card>
      </div>
    </>
  )
}

export default Feed;