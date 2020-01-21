import React, { useState } from 'react';
import { Link } from 'next/router';
import {
  Comment,
  Avatar,
  List,
  Icon,
  Tooltip,
  Form,
  Button,
  Input,
} from 'antd';
import moment from 'moment';

function CustomNestedComment({ submitNestedComment, parent }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  function submit() {
    submitNestedComment(value, setLoading, setValue, parent);
  }

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  return (
    <Comment
      avatar={(
        <Avatar icon="user" style={{ marginTop: 4 }} />
      )}
      content={(
        <Input
          value={value}
          onChange={handleValueChange}
          style={{ borderRadius: 25 }}
          onPressEnter={submit}
          suffix={
            loading ? <Icon type="loading" style={{ color: 'rgba(0,0,0,.45)' }} /> : <span />
          }
        />
      )}
    />
  )
}

function CommentList({ comments, authUser, deleteComment, submitComment }) {
  const [nestedCommentsOpen, setNestedCommentsOpen] = useState([]);
  const { usersData, userIDs } = useGetUsersData();

  function handleNestedOpen(id) {
    const index = nestedCommentsOpen.indexOf(id);
    if (index === -1) {
      setNestedCommentsOpen(prev => [...prev, id]);
    }
    else {
      setNestedCommentsOpen(prev => prev.filter(c => c !== id))
    }
  }

  function submitNestedComment(text, loadingSetter, valueSetter, parent) {
    submitComment(text, loadingSetter, valueSetter, parent);
  }

  function renderActions({ author, id, flex }) {
    return [
      <span>
        <span>
          <Tooltip title="Like">
            <Icon
              type="like"
            //theme={action === 'liked' ? 'filled' : 'outlined'}
            //onClick={this.like}
            />
          </Tooltip>
        </span>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {flex}
        </span>
      </span>,
      <span onClick={() => handleNestedOpen(id)}>Comment</span>,
      authUser.id === author ? <span onClick={() => deleteComment(id)}>Delete</span> : null
    ];
  }

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => (
        !props.parent ?
          <Comment
            author={<Link to={`/user/${props.author}`}>{retrieveUsername(usersData, userIDs, props.author)}</Link>}
            content={<p dangerouslySetInnerHTML={{ __html: processText(props.text) }}></p>}
            avatar={
              <Link to={`/user/${props.author}`}>
                <Avatar icon="user" style={{ cursor: 'pointer', border: getBorderByGender(usersData, userIDs, props.author) }} />
              </Link>
            }
            datetime={<span>
              <Tooltip title={
                <>{moment(props.time).format('YYYY/MM/DD HH:mm A')}</>
              }>{getPostedTime(props.time)}</Tooltip>
            </span>}
            actions={renderActions(props)}
          >
            {nestedCommentsOpen.includes(props.id) &&
              <CustomNestedComment
                submitNestedComment={submitNestedComment}
                parent={props.id}
              />
            }
            {props.replies.map((comment, i) => (
              <Comment
                key={`nested${i}`}
                author={<a>{retrieveUsername(usersData, userIDs, comment.author)}</a>}
                content={<p dangerouslySetInnerHTML={{ __html: processText(comment.text) }}></p>}
                avatar={<Avatar icon="user" style={{ cursor: 'pointer', border: getBorderByGender(usersData, userIDs, comment.author) }} />}
                datetime={<span>
                  <Tooltip title={
                    <>{moment(props.time).format('YYYY/MM/DD HH:mm A')}</>
                  }>{getPostedTime(props.time)}</Tooltip>
                </span>}
                actions={[
                  <span>
                    <span>
                      <Tooltip title="Like">
                        <Icon type="like" />
                      </Tooltip>
                    </span>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                      {comment.flex}
                    </span>
                  </span>,
                  authUser.id === comment.author ? <span onClick={() => deleteComment(comment.id)}>Delete</span> : null
                ]}
              />
            ))
            }
          </Comment>
          : <></>
      )
      }
    />
  );
}

const { TextArea } = Input;

export const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
    <div>
      <Form.Item>
        <TextArea rows={4} maxLength={400} onChange={onChange} value={value} placeholder="Write something..." />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >Comment</Button>
      </Form.Item>
    </div>
  );

export default withRouter(CommentList);