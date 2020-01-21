import React, { useState } from 'react';
import Link from 'next/link';
import {
  Comment,
  Avatar,
  List,
} from 'antd';

function CommentList({ comments }) {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={item => (
        <Comment
          author={<Link href={`/user/${item.author.id}`}><a>{item.author.first_name} {item.author.last_name}</a></Link>}
          avatar={<Avatar icon="user" style={{ marginTop: 4 }} />}
          content={<p dangerouslySetInnerHTML={{ __html: item.comment }}></p>}
        />
      )
      }
    />
  );
}

export default CommentList;