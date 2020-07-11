import React, { useState } from 'react';
import { Form, Input, Button, Spin, AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { urls } from '../constants';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
};
const formItemLayout = {
  labelCol: {
    // xs: { span: 24 },
    // sm: { span: 4 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    // sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    // xs: { span: 24, offset: 0 },
    // sm: { span: 20, offset: 4 },
  },
};


const NewAnalysis = props => {

  const [loading, setLoading] = useState(false);
  const [numOfTweetsAnalysed, setNumOfTweetsAnalysed] = useState(0);
  const [numOfTweetsAnalysedFetched, setNumOfTweetsAnalysedFetched] = useState(false);
  const [autoSuggestedOptions, setAutoSuggestedOptions] = useState([]);
  const [autoSuggestedValues, setAutoSuggestedValues] = useState([]);

  const onFinish = values => {
    var jsonValues = {
      "title": values.title,
      "description": values.description,
      "keywords": []
    }
    for (var i in values.keywords) {
      jsonValues["keywords"][i] = {
        "keyword": values.keywords[i]
      }
    }
    setLoading(true);
    axios
      .get(`${urls.baseUrl}api/constants/all/`)
      .then(res => {
        setNumOfTweetsAnalysed(res.data);
        setNumOfTweetsAnalysedFetched(true);
      })
      .catch(err => console.log(err.message));
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    axios
      .post(`${urls.baseUrl}api/analysis/user/`, jsonValues)
      .then(res => {
        setLoading(false);
        props.history.push('/analysis');
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      })
  };

  const onSearch = async searchText => {
    const res = await axios.get(`${urls.baseUrl}api/suggestions/searchsuggestions/${searchText}/`)
    setAutoSuggestedOptions(res.data);
    setAutoSuggestedValues([...autoSuggestedValues, searchText]);
  };

  const onSelect = data => {
    console.log('onSelect', data);
  };

  if (!props.token || props.token === "" || props.token === undefined || props.token === null) {
    return (
      <p>Unauthorized</p>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <br />
        {
          numOfTweetsAnalysedFetched
            ?
            <h2>This is a real time analysis of {numOfTweetsAnalysed} tweets. This may take some time.</h2>
            :
            <div></div>
        }
        <br />
        <Spin size="large" />
        <br />
        <br />
      </div>
    );
  }

  return (
    <Form style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    }} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please give a title'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[
        {
          required: true,
          message: 'Please give a description'
        }
      ]}>
        <Input.TextArea />
      </Form.Item>
      <Form.List name="keywords">
        {(fields, { add, remove }) => {
          return (
            <div style={{
              display: 'flex',
              flex: 1,
            }} >
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Keywords' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input keyword or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    {/* <Input placeholder="keyword" style={{ width: '60%' }} /> */}
                    {/* <AutoComplete /> */}
                    <AutoComplete
                      options={autoSuggestedOptions}
                      style={{
                        width: 200,
                      }}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      placeholder="keyword"
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined style={{marginRight: 65}} />
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(NewAnalysis);