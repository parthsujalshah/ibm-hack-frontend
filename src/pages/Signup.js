import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { NavLink } from 'react-router-dom';

const RegistrationForm = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onAuth(values.username, values.email, values.password, values.confirmPassword);
    props.history.push('/')
  };
  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
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
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Signup</Button>
        Or
        <NavLink to='/login/'> Login</NavLink>
      </Form.Item>
    </Form >
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
    onAuth: (username, email, password, confirmPassword) => dispatch(actions.authSignup(username, email, password, confirmPassword))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);