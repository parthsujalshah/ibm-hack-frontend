import React, { useState, useEffect } from 'react';
import { Spin, Input, Card, Button, List, Menu } from 'antd';
import axios from 'axios';
import { urls } from '../constants';
import { connect } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import MapContainer from '../components/MapContainer';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import Trends from '../components/Trends';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const AnalysisSingle = props => {

  const [maxSentimentName, setMaxSentimentName] = useState();
  const [keywordSentence, setKeywordSentence] = useState();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [toneLabels, setToneLabels] = useState();
  const [indivudualSentiments, setIndivudualSentiments] = useState();
  const [totalSentiments, setTotalSentiments] = useState();
  const [mapStatewiseSentiments, setMapStatewiseSentiments] = useState();
  const [datewiseTweetTrends, setDatewiseTweetTrends] = useState();
  const [analysisTitle, setAnalysisTitle] = useState();
  const [analysisDescription, setAnalysisDescription] = useState();
  const [analysisDate, setAnalysisDate] = useState();
  const [analysisKeywords, setAnalysisKeywords] = useState([]);
  const [trendingTweets, setTrendingTweets] = useState([]);
  const [maxSentPerTrendingTweet, setMaxSentPerTrendingTweet] = useState([]);
  const [trendingKeywords, setTrendingKeywords] = useState([]);

  const keywordSentenceSetter = (keywords) => {
    var sentence = "";
    for (var keyword in keywords) {
      sentence = sentence + keywords[keyword].keyword + ", ";
    }
    setKeywordSentence(sentence.slice(0, -2));
  };

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
    setLoading(true);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    axios
      .get(`${urls.baseUrl}api/analysis/user/${props.match.params.analysisID}/`)
      .then(res => {
        trendingTweetsSetter(JSON.parse(res.data.trending_tweets));
        setTrendingKeywords(JSON.parse(res.data.trending_keywords));
        setDatewiseTweetTrends(res.data.total_sentiment_count_per_date);
        setToneLabels(res.data.tone_labels);
        setTotalSentiments(res.data.total_sentiments);
        setIndivudualSentiments(res.data.total_indivudual_sentiments);
        setMapStatewiseSentiments(res.data.total_sentiment_count_per_state);
        setAnalysisDescription(res.data.description);
        setAnalysisTitle(res.data.title);
        setAnalysisDate(res.data.date_created.slice(0, 10));
        setAnalysisKeywords(res.data.keywords);
        keywordSentenceSetter(res.data.keywords);
        setMaxSentimentName(res.data.max_sentiment.sentiment);
        setLoading(false);
      })
      .catch(err => {
        setErrMessage(err.message);
        setLoading(false);
      });
  }, []);

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

  const keywordMapper = () => {
    return analysisKeywords.map(element => {
      return (
        <Input disabled={true} defaultValue={element['keyword']} />
      )
    });
  };

  return (
    <div
      id="capture"
      style={{
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
          <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginRight: 10
          }}>
            <Input disabled={true} size="large" defaultValue={analysisTitle} />
            <br />
            <br />
            <Input.TextArea disabled={true} defaultValue={analysisDescription} />
            <br />
            <br />
            <div style={{
              width: "80%"
            }}>
              <Input disabled={true} defaultValue={analysisDate} />
              {keywordMapper()}
            </div>
          </div>
          <br />
          <br />
          <Trends trendingHash={trendingKeywords} maxSentPerTrendingTweet={maxSentPerTrendingTweet} popularTweets={trendingTweets} />
        </div>
        <br />
        <h3>Future sentiments regarding {keywordSentence}: {maxSentimentName}</h3>
        <br />
        <br />
        <Button type="secondary" onClick={() => {
          html2canvas(document.querySelector("#capture"), {
            scrollX: 0,
            scrollY: 0,
          }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            var width = pdf.internal.pageSize.getWidth();
            pdf.addImage(imgData, 'PNG', 0, 0, width, 0);
            pdf.save("download.pdf");
          });
        }}>Generate PDF</Button>
        <br />
        <br />
        <Button onClick={() => {
          if (window.confirm('Are you sure you want to delete this?')) {
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${props.token}`
            };
            axios
              .delete(`${urls.baseUrl}api/analysis/user/${props.match.params.analysisID}/`)
              .then(res => props.history.push('/analysis'))
              .catch(err => setErrMessage(err.message));
          }
        }} type="primary" danger>Delete</Button>
        <br />
        <br />
        <br />
        <PieChart toneLabels={toneLabels} indivudualSentiments={indivudualSentiments} totalSentiments={totalSentiments} />
        <br />
        <br />
        <br />
        <LineChart datewiseTweetTrends={datewiseTweetTrends} />
        <br />
        <br />
        <MapContainer statewiseSentiments={mapStatewiseSentiments} />
        <br />
        <br />
        <br />
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