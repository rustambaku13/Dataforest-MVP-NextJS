import React, { useState } from 'react';
import { Comment, Avatar, Button, Form } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { createDiscussionComment } from '../../services/discussions';

const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
);

function FeedComments({ comments }) {
  console.log({ comments })
  const Router = useRouter();
  const { id } = Router.query;

  return (
    <Comment
      avatar={(
        <Avatar icon="user" style={{ marginTop: 4 }} />
      )}
      content={(
        <Editor id={id} />
      )}
    />
  )
}

function Editor({ id }) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const data = await createDiscussionComment({ id, comment: value });
    setValue("");
    setIsSubmitting(false);
  }

  return (
    <div>
      <Form.Item>
        <ReactQuill name="content" style={{ minHeight: 200 }} onChange={setValue} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={isSubmitting}
          onClick={submit}
          type="primary"
        >Comment</Button>
      </Form.Item>
    </div>
  );
}

export default FeedComments;