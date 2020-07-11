import React from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom';
import BaseRouter from './routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component {
  componentWillMount() {
    this.props.onTryAutoSignup();
  };

  render() {
    window.watsonAssistantChatOptions = {
      integrationID: process.env.REACT_APP_IBM_ASSISTANT_ID, // The ID of this integration.
      region: "eu-gb", // The region your integration is hosted in.
      serviceInstanceID: process.env.REACT_APP_IBM_ASSISTANT_SERICIVE_INSTANCE_ID, // The ID of your service instance.
      onLoad: function (instance) { instance.render(); }
    };
    setTimeout(function () {
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
    return (
      <div>
        <BrowserRouter>
          <CustomLayout {...this.props}>
            <BaseRouter {...this.props} />
          </CustomLayout>
        </BrowserRouter>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
