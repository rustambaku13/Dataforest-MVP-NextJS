import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { createDiscussionComment } from '../../services/discussions';
import CommentList from './commentList';
import './style.scss';

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

function FeedComments({ comments, setComments }) {
  const Router = useRouter();
  const { authUser } = useSelector(state => state.sessionState);
  const { id } = Router.query;

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar shape="square" src={authUser.profile_pic} style={{ marginTop: 4 }} />}
        content={<Editor id={id} setComments={setComments} />}
      />
    </>
  )
}

function Editor({ id, setComments }) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // start loading
    setIsSubmitting(true);

    // get returned comment data from server
    const data = await createDiscussionComment({ id, comment: value });

    // update comments on UI
    setComments(prev => [data, ...prev]);

    // clear input
    setValue("");

    // cancel loading
    setIsSubmitting(false);
  }

  return (
    <div>
      <ReactQuill name="content" onChange={setValue} value={value} />
      <Button
        htmlType="submit"
        loading={isSubmitting}
        onClick={submit}
        type="primary"
        style={{ marginTop: '1.2rem' }}
      >Comment</Button>
    </div>
  );
}

export default FeedComments;