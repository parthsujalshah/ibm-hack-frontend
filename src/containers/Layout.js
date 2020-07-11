import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { urls } from '../constants';

const { Header, Content } = Layout;

const CustomLayout = props => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {
            props.isAuthenticated ?
              <Menu.Item key="1" onClick={props.logout}>Logout</Menu.Item>
              :
              <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
          }
          <Menu.Item key="2"><Link to="/">Home</Link></Menu.Item>
          {
            props.isAuthenticated ?
              <Menu.Item key="3"><Link to="/analysis">My Analysis</Link></Menu.Item>
              :
              null
          }
          {
            props.isAuthenticated ?
              null
              :
              <Menu.Item style={{ float: 'right' }} key="4"><a href={`${urls.baseUrl}admin/`}>Admin Panel</a></Menu.Item>
          }
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <div style={{
            display: 'flex',
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {props.children}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));