import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Comment,
  Avatar,
  List,
  Icon,
  Button
} from 'antd';
import { formatDate } from '../../helpers/dateFormat';
import { upvoteComment, replyComment } from '../../services/discussions';
import { useUpvote } from '../../hooks';
import { isEditorEmpty } from '../../helpers/formValidation';

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

function CommentList({ comments }) {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
      itemLayout="horizontal"
      renderItem={item => <CommentItem item={item} />}
    />
  );
}

function CommentItem(props) {
  const [item, setItem] = useState(props.item);
  const [number, color, updateUpvote] = useUpvote(item.upvotes_number, item.upvoted);
  const [replyVisible, setReplyVisible] = useState(false);

  // state values for quill editor
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Router = useRouter();
  const { id } = Router.query;

  function upvote() {
    upvoteComment({ discussionID: id, commentID: item.id });
    updateUpvote();
  }

  async function submitReply(e) {
    e.preventDefault();

    // check if empty
    if (!isEditorEmpty(value)) {

      // start loading
      setIsSubmitting(true);

      // get returned comment data from server
      const data = await replyComment({ discussionID: id, commentID: item.id, comment: value });

      // update replies on UI
      setItem(prev => ({ ...prev, comments: [...prev.comments, data] }));

      // clear input
      setValue("");

      // cancel loading
      setIsSubmitting(false);
    }
  }

  return (
    <Comment
      author={<Link href={`/user/${item.author.id}`}><a>{item.author.first_name} {item.author.last_name}</a></Link>}
      avatar={<Avatar shape="square" src={item.author.profile_pic} style={{ marginTop: 4 }} />}
      content={<p dangerouslySetInnerHTML={{ __html: item.comment }}></p>}
      datetime={formatDate(item.timestamp)}
      actions={[
        <span key="like" style={{ cursor: 'pointer' }} onClick={upvote}>
          <Icon
            type="caret-up"
            style={{ color }}
          />
          <span style={{ paddingLeft: 8, color }}>{number}</span>
        </span>,
        <span key="reply-to" onClick={() => setReplyVisible(prev => !prev)}>Reply{item.comments.length ? ` (${item.comments.length})` : null}</span>
      ]}
    >
      {
        replyVisible &&
        item.comments.length > 0 &&
        <CommentList comments={item.comments} />
      }
      {
        replyVisible &&
        <Comment
          avatar={<Avatar shape="square" src={item.author.profile_pic} style={{ marginTop: 4 }} />}
          content={
            <Editor
              value={value}
              onChange={setValue}
              loading={isSubmitting}
              onSubmit={submitReply}
            />
          }
        />
      }
    </Comment>
  )
}

export function Editor({ loading, onSubmit, value, onChange }) {
  return (
    <div>
      <ReactQuill name="content" onChange={onChange} value={value} />
      <Button
        htmlType="submit"
        loading={loading}
        onClick={onSubmit}
        type="primary"
        style={{ marginTop: '1.2rem' }}
      >Comment</Button>
    </div>
  );
}

export default CommentList;