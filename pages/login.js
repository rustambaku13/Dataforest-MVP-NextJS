import React from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Input, Icon, Tooltip, Button } from 'antd';
import * as validators from '../helpers/formValidation';
import { setAuthUser } from '../actions';
import '../static/styles/login.scss';

const FormItem = Form.Item;

function Login(props) {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    console.log('submit')
    e.preventDefault();

    const { username, password } = props.form.getFieldsValue();

    dispatch({ type: "SET_AUTH_USER", payload: { user: username } });
  }

  const {
    getFieldDecorator,
    getFieldError,
  } = props.form;

  const usernameError = getFieldError('username');
  const passwordError = getFieldError('password');

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Dataforest: Your Single Venue for the Data that you need!</title>
        <meta name="description" content="Dataforest your data marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="login-page">
        <div className="login-container">
          <Link href="/">
            <div className="logo">
              <img src="/static/assets/LOGO2.png" height="70" style={{ cursor: 'pointer' }} />
            </div>
          </Link>
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
                    { validator: validators.validateUsername }
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
                  rules: [
                    { validator: validators.validateToNextPassword }
                  ],
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
            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <Button type="primary" htmlType="submit">LOG IN</Button>
            </div>
          </Form>
          <p style={{ color: 'white', fontSize: '1.2em' }}>
            Don't have an account? <Link href="signup"><a style={{ color: '#007bff' }}>SIGN UP</a></Link>
          </p>
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

export default Form.create()(Login);