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
  const [upvotes_number, setUpvotes_number] = useState(item.upvotes_number);
  const [upvotedColor, setUpvotedColor] = useState(item.upvoted ? '#1890ff' : '#BBB');
  const [upvoted, setUpvoted] = useState(item.upvoted);

  const Router = useRouter();
  const { id } = Router.query;

  function upvote() {
    upvoteComment({ discussionID: id, commentID: item.id });

    // subtract if already upvoted
    if (upvoted) {
      setUpvotes_number(prev => prev - 1);
      setUpvotedColor('#BBB');
      setUpvoted(false);
    }
    else {
      setUpvotes_number(prev => prev + 1);
      setUpvotedColor('#1890ff');
      setUpvoted(true);
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
            style={{ color: upvotedColor }}
          />
          <span style={{ paddingLeft: 8, color: upvotedColor }}>{upvotes_number}</span>
        </span>,
        <span key="reply-to">Comment</span>
      ]}
    />
  )
}

export default CommentList;