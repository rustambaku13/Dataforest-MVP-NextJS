import React, { useState } from 'react';
import Link from 'next/link';
import Meta from '../components/Meta';
import { Form, Input, Icon, Tooltip, Button, Upload, message } from 'antd';
import * as validators from '../helpers/formValidation';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { signup } from '../services/user';
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
  const [loading, setLoading] = useState(false);
  useProtectedRoute(auth => auth);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { username, firstName, lastName, password, email } = props.form.getFieldsValue();
      const data = await signup({ username, first_name: firstName, last_name: lastName, password, email });

      setLoading(false);

      dispatch(setAuthUser(data));
      Router.push('/');
    }
    catch (e) {
      setLoading(false);
      message.error(e.response.data.non_field_errors[0]);
    }
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
      <Meta
        title="Signup"
        description="Sign up to DataForest"
      />

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
                    // rules: [
                    //   { validator: validators.validateToNextPassword }
                    // ],
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
                        onChange={e => props.form.setFieldsValue({ confirm: e.target.value })}
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
                <Button type="primary" htmlType="submit" loading={loading}>SIGN UP</Button>
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