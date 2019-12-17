import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Input, Icon, Tooltip, Button, Upload } from 'antd';
import * as validators from '../helpers/formValidation';
import '../static/styles/signup.scss';

const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function Signup(props) {
  const [avatar, setAvatar] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  function handleSubmit(e) {
    console.log('submit')
    e.preventDefault();
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setImgLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImgLoading(false);
        setAvatar(imageUrl);
      });
    }
  };

  const {
    getFieldDecorator,
    getFieldError,
  } = props.form;

  const firstNameError = getFieldError('firstName');
  const lastNameError = getFieldError('lastName');

  const emailError = getFieldError('email');
  const usernameError = getFieldError('username');
  const passwordError = getFieldError('password');
  const confirmError = getFieldError('confirm');

  const uploadButton = (
    <div>
      <Icon type={imgLoading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Dataforest: Your Single Venue for the Data that you need!</title>
        <meta name="description" content="Dataforest your data marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="signup-page">
        <div className="signup-container">
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="profile">
              <div className="picture-uploader">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  //beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </div>
              <div className="profile-form">
                <FormItem
                  validateStatus={firstNameError ? 'error' : ''}
                  help={''}
                  label="First Name"
                >
                  {getFieldDecorator('firstName', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.validateName }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={firstNameError} trigger="focus">
                      <Input
                        type="text"
                        placeholder="First Name"
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>
                <FormItem
                  validateStatus={lastNameError ? 'error' : ''}
                  help={''}
                  label="Last Name"
                >
                  {getFieldDecorator('lastName', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.validateName }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={lastNameError} trigger="focus">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>
              </div>
            </div>
            <div className="credentials">
              <Link href="/">
                <div className="logo">
                  <img src="/static/assets/LOGO2.png" height="70" style={{ cursor: 'pointer' }} />
                </div>
              </Link>

              <div className="signup-form">
                <FormItem
                  validateStatus={emailError ? 'error' : ''}
                  help={''}
                  label="Email"
                >
                  {getFieldDecorator('email', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.validateEmail }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={emailError} trigger="focus">
                      <Input
                        type="email"
                        placeholder="Email"
                        prefix={<Icon type="mail" />}
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>
                <FormItem
                  validateStatus={usernameError ? 'error' : ''}
                  help={''}
                  label="Username"
                >
                  {getFieldDecorator('username', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.validateName }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={usernameError} trigger="focus">
                      <Input
                        type="text"
                        placeholder="Username"
                        prefix={<Icon type="user" />}
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>

                <FormItem
                  validateStatus={passwordError ? 'error' : ''}
                  help={''}
                  label="Password"
                >
                  {getFieldDecorator('password', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.validateToNextPassword }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={passwordError} trigger="focus">
                      <Input.Password
                        onChange={e => props.form.setFieldsValue({ password: e.target.value })}
                        type="password"
                        placeholder="Password"
                        prefix={<Icon type="lock" />}
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>
                <FormItem
                  validateStatus={confirmError ? 'error' : ''}
                  help={''}
                  label="Confirm"
                >
                  {getFieldDecorator('confirm', {
                    validateTrigger: 'onBlur',
                    rules: [
                      { validator: validators.compareToFirstPassword }
                    ],
                    initialValue: ''
                  })(
                    <Tooltip placement="top" title={passwordError} trigger="focus">
                      <Input.Password
                        onChange={e => props.form.setFieldsValue({ password: e.target.value })}
                        type="password"
                        placeholder="Password"
                        prefix={<Icon type="lock" />}
                        required
                      />
                    </Tooltip>
                  )}
                </FormItem>
              </div>
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <Button type="primary" htmlType="submit">SIGN UP</Button>
              </div>
              <p style={{ color: 'white', fontSize: '1.2em' }}>
                Have an account? <Link href="/login"><a style={{ color: '#007bff' }}>LOG IN</a></Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <style scoped>{`
      body {
        background-image: linear-gradient(to bottom right,var(--dataforest_blue), var(--dataforest_dark));
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        z-index: -1;
      }
    `}</style>
    </>
  )
}

export default Form.create()(Signup);