import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Comment,
  Avatar,
  List,
  Icon
} from 'antd';
import { formatDate } from '../../helpers/dateFormat';
import { upvoteComment } from '../../services/discussions';
import useUpvote from '../../hooks/useUpvote';

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

function CommentItem({ item }) {
  const [number, color, updateUpvote] = useUpvote(item.upvotes_number, item.upvoted);

  const Router = useRouter();
  const { id } = Router.query;

  function upvote() {
    upvoteComment({ discussionID: id, commentID: item.id });
    updateUpvote();
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
        <span key="reply-to">Comment</span>
      ]}
    />
  )
}

export default CommentList;