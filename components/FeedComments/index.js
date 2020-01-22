import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { createDiscussionComment } from '../../services/discussions';
import CommentList, { Editor } from './commentList';
import './style.scss';

function FeedComments({ comments, setComments }) {
  const Router = useRouter();
  const { authUser } = useSelector(state => state.sessionState);
  const { id } = Router.query;

  // state values for quill editor
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitComment(e) {
    e.preventDefault();

    // check if empty
    if (value.trim().length) {

      // start loading
      setIsSubmitting(true);

      // get returned comment data from server
      const data = await createDiscussionComment({ id, comment: value });

      // update comments on UI
      setComments(prev => [...prev, data]);

      // clear input
      setValue("");

      // cancel loading
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar shape="square" src={authUser.profile_pic} style={{ marginTop: 4 }} />}
        content={
          <Editor
            value={value}
            onChange={setValue}
            loading={isSubmitting}
            onSubmit={submitComment}
          />
        }
      />
    </>
  )
}

export default FeedComments;