import React, { useState, useEffect } from 'react';
import { Spin, Button, Card, List, Menu } from 'antd';
import axios from 'axios';
import { urls } from '../constants';
import { connect } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import MapContainer from '../components/MapContainer';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import Trends from '../components/Trends';

const AnalysisSingle = props => {

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [numOfTweetsAnalysed, setNumOfTweetsAnalysed] = useState(0);
  const [numOfTweetsAnalysedFetched, setNumOfTweetsAnalysedFetched] = useState(false);
  const [startAnalysisButtonPressed, seStartAnalysisButtonPressed] = useState(false);
  const [toneLabels, setToneLabels] = useState();
  const [indivudualSentiments, setIndivudualSentiments] = useState();
  const [totalSentiments, setTotalSentiments] = useState();
  const [mapStatewiseSentiments, setMapStatewiseSentiments] = useState();
  const [datewiseTweetTrends, setDatewiseTweetTrends] = useState();
  const [trendingTweets, setTrendingTweets] = useState([]);
  const [maxSentPerTrendingTweet, setMaxSentPerTrendingTweet] = useState([]);
  const [trendingKeywords, setTrendingKeywords] = useState([]);

  const trendingTweetsSetter = trendingTweetsSentArray => {
    const indTweetArray = [];
    const maxSentArray = [];
    for (var tweet_sent_dict in trendingTweetsSentArray) {
      indTweetArray.push(trendingTweetsSentArray[tweet_sent_dict]['tweet_text']);
      var jsonSent = JSON.parse(trendingTweetsSentArray[tweet_sent_dict]['sent_count']);
      var maxSent = Object.keys(jsonSent)[0];
      for (var sent_per_tweet in jsonSent) {
        if (jsonSent[sent_per_tweet] > jsonSent[maxSent]) {
          maxSent = sent_per_tweet
        }
      }
      maxSentArray.push(maxSent);
    }
    setTrendingTweets(indTweetArray);
    setMaxSentPerTrendingTweet(maxSentArray);
  };

  useEffect(() => {
    if (startAnalysisButtonPressed) {
      setLoading(true);
      axios
        .get(`${urls.baseUrl}api/constants/all/`)
        .then(res => {
          setNumOfTweetsAnalysed(res.data);
          setNumOfTweetsAnalysedFetched(true);
        })
        .catch(err => console.log(err.message));
      axios
        .get(`${urls.baseUrl}api/analysis/generic/`)
        .then(res => {
          trendingTweetsSetter(res.data.trending_tweets);
          setTrendingKeywords(res.data.trending_keywords);
          setDatewiseTweetTrends(res.data.total_sentiment_count_per_date);
          setToneLabels(res.data.tone_labels);
          setTotalSentiments(res.data.total_sentiments);
          setIndivudualSentiments(res.data.total_indivudual_sentiments);
          setMapStatewiseSentiments(res.data.total_sentiment_count_per_state)
          setLoading(false);
        })
        .catch(err => {
          setErrMessage(err.message);
          setLoading(false);
        });
    }
  }, [startAnalysisButtonPressed]);

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

  if (errMessage !== "") {
    return <p>{errMessage}</p>
  }

  if (!startAnalysisButtonPressed) {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button style={{
          marginBottom: 50,
          marginTop: 20
        }}
          onClick={() => seStartAnalysisButtonPressed(true)}
          type="primary" size="large">
          Start Analysis
        </Button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>
      <div style={{
        dispay: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Trends trendingHash={trendingKeywords} maxSentPerTrendingTweet={maxSentPerTrendingTweet} popularTweets={trendingTweets} />
        </div>
        <br />
        <br />
        <br />
        <PieChart toneLabels={toneLabels} indivudualSentiments={indivudualSentiments} totalSentiments={totalSentiments} />
        <br />
        <LineChart datewiseTweetTrends={datewiseTweetTrends} />
        <br />
        <MapContainer statewiseSentiments={mapStatewiseSentiments} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(AnalysisSingle);