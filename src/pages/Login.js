import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const Login = props => {
  const onFinish = values => {
    props.onAuth("#", values.email, values.password);
    props.history.push('/');
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  };

  return (
    <div>
      {errorMessage}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
          {" Or"}
          <NavLink to='/signup/'> signup</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password) => dispatch(actions.authLogin(username, email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);