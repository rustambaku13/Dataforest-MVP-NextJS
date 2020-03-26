import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Meta from '../components/Meta';
import Router from 'next/router';
import { Form, Input, Icon, Tooltip, Button, message,Row } from 'antd';
import * as validators from '../helpers/formValidation';
import { setAuthUser } from '../actions';
import { login, getUserInfoByToken } from '../services/user';
import { useProtectedRoute } from '../hooks';
import '../static/styles/login.scss';

const FormItem = Form.Item;

function Login(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useProtectedRoute(auth => auth);

  async function handleSubmit(e) {
    e.preventDefault();

    props.form.validateFields(
      async (err) => {
        if (!err) {
          try {
            setLoading(true);
            const { username, password } = props.form.getFieldsValue();
            const token = await login({ username, password });
            const info = await getUserInfoByToken(token);

            setLoading(false);

            dispatch(setAuthUser(info));
            Router.push('/');
          }
          catch (e) {
            setLoading(false);
            message.error(e.response.data.non_field_errors[0]);
          }
        }
      }
    )

  }

  const {
    getFieldDecorator,
    getFieldError,
  } = props.form;

  const usernameError = getFieldError('username');
  const passwordError = getFieldError('password');

  return (
    <>
      <Meta
        title="Login"
        description="Login to DataForest"
      />

      <div className="login-page">
        <div className="login-container">
          <h2 style={{"textAlign":"center",fontWeight:"600",fontSize:"1.8em"}}>Welcome</h2>
          
            <div className="logo">
            <Link href="/">
              <img src="/static/assets/LOGO2.png" height="70" style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          
          <Form onSubmit={handleSubmit}>
            <div className="login-form">
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
                      size="large"
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
                      size="large"
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
            <div style={{ textAlign: 'right' }}>
              <Link href="forgot-password"><a style={{ fontSize: '1.1em', color: '#007bff' }}>Forgot your password?</a></Link>
            </div>
            <Row type='flex' style={{"margin":"2rem 0 0.5rem 0","width":"100%"}} justify='center'>
              <Button style={{paddingLeft:"1.5rem",paddingRight:"1.5rem"}} size="large" className="circular-button-large" type="primary" htmlType="submit" loading={loading}>LOG IN</Button>
            </Row>
          </Form>
          <p style={{  textAlign:"center",fontSize: '1em' }}>
            Don't have an account? <Link href="/signup"><a style={{ color: '#007bff' }}>SIGN UP</a></Link>
          </p>
        </div>
      </div>
      <style scoped>{`
      .login-page {
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

export default Form.create()(Login);