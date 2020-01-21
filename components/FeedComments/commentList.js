import React, { useState } from 'react';
import Link from 'next/link';
import {
  Comment,
  Avatar,
  List,
  Icon
} from 'antd';
import { formatDate } from '../../helpers/dateFormat';
import { upvoteComment } from '../../services/discussions';

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
  return (
    <Comment
      author={<Link href={`/user/${item.author.id}`}><a>{item.author.first_name} {item.author.last_name}</a></Link>}
      avatar={<Avatar shape="square" src={item.author.profile_pic} style={{ marginTop: 4 }} />}
      content={<p dangerouslySetInnerHTML={{ __html: item.comment }}></p>}
      datetime={formatDate(item.timestamp)}
      actions={[
        <span key="like">
          <Icon
            type="caret-up"
            //theme={action === 'liked' ? 'filled' : 'outlined'}
          />
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.upvotes_number}</span>
        </span>,
        <span key="reply-to">Reply to</span>
      ]}
    />
  )
}

export default CommentList;