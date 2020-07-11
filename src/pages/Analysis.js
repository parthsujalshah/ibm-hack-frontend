import React, { useState, useEffect } from 'react';
import { List, Card, Spin } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { connect } from 'react-redux';
import { urls } from '../constants';
import axios from 'axios';

const { Meta } = Card;

const AnalysisList = props => {
  const [loading, setloading] = useState(false);
  const [analysisList, setAnalysisList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardItemBgColor, setCardItemBgColor] = useState(['']);
  const [createCardColor, setCreateCardColor] = useState('');

  useEffect(() => {
    setloading(true);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    axios
      .get(`${urls.baseUrl}api/analysis/user/`)
      .then(res => {
        setloading(false);
        setAnalysisList([]);
        setErrorMessage(null);
        setAnalysisList(res.data);
        setCardItemBgColor(['']);
        setCreateCardColor('');
        setloading(false);
        var colorArray = [''];
        for (var index in res.data) {
          colorArray[index] = '';
        }
        setCardItemBgColor(colorArray);
      })
      .catch(err => {
        setloading(false);
        setErrorMessage(err.message);
      });
  }, []);

  const onCreateCardClick = () => {
    props.history.push('/analysis/create');
  };

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <div style={{
      display: 'flex',
      flex: 1,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {errorMessage ?
        <p>{errorMessage}</p>
        :
        <p></p>
      }
      <List
        grid
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20
        }}
        dataSource={analysisList}
        renderItem={(item, index) => {
          return (
            <List.Item style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 30,
              marginRight: 30,
            }}>
              <Card
                onMouseEnter={(event) => {
                  var color_array = [];
                  for (var i in cardItemBgColor) {
                    color_array[i] = '';
                    if (parseInt(i) === parseInt(index)) {
                      color_array[i] = '#CCFFCC';
                    }
                  }
                  setCardItemBgColor(color_array);
                }}
                onMouseLeave={(event) => {
                  var color_array = [];
                  for (var i in cardItemBgColor) {
                    color_array[i] = '';
                    if (parseInt(i) === parseInt(index)) {
                      color_array[i] = '';
                    }
                  }
                  setCardItemBgColor(color_array);
                }}
                onClick={() => {
                  props.history.push(`/analysis/view/${item.id}`);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 40,
                  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                  padding: 30,
                  backgroundColor: cardItemBgColor[index]
                }}
              >
                <Meta
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )
        }}
      />
      {!errorMessage ?
        <Card onClick={onCreateCardClick} style={{
          display: 'flex',
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
          boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
          backgroundColor: createCardColor
        }}
          onMouseEnter={(event) => {
            setCreateCardColor('#c0d7fc');
          }}
          onMouseLeave={(event) => {
            setCreateCardColor('');
          }}
        >
          <Meta
            title="Create New Analysis"
          />
          <PlusCircleTwoTone style={{
            fontSize: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20
          }} />
        </Card>
        :
        <p></p>
      }
    </div >
  );
}

const mapStateToProps = state => {
  return {
    token: state.token,
    error: state.error
  };
};

export default connect(mapStateToProps)(AnalysisList);