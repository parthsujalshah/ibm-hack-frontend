import React, { useState } from 'react';
import { Menu, List, Tooltip } from 'antd';

const Trends = props => {

  const [tweetHashtagMenu, setTweetHashtagMenu] = useState('populartweets');
  const [emojiSentimentMapper, setEmojiSentimentMapper] = useState({
    'anger': '😡',
    'fear': '😨',
    'joy': '😀',
    'sadness': '😢',
    'analytical': '🤔',
    'confident': '😎',
    'tentative': '🤨',
    'disgust': '😤',
  });

  const tweetHashtagMenuClicked = event => {
    setTweetHashtagMenu(event.key);
  };

  return (
    <div style={{
      maxWidth: "40%",
      marginLeft: 10
    }}>
      <Menu onClick={event => tweetHashtagMenuClicked(event)} mode="horizontal" selectedKeys={tweetHashtagMenu}>
        <Menu.Item key="populartweets">Popular Tweets</Menu.Item>
        <Menu.Item key="popularhashtags">Trending Keywords</Menu.Item>
      </Menu>
      {
        tweetHashtagMenu === "populartweets"
          ?
          (
            <List
              style={{
                backgroundColor: 'white',
              }}
              bordered
              dataSource={props.popularTweets}
              renderItem={(item, index) => {
                return (
                  <Tooltip title={props.maxSentPerTrendingTweet[index]}>
                    <List.Item style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                      <p style={{
                        fontSize: 20,
                        marginRight: 7
                      }}>{emojiSentimentMapper[props.maxSentPerTrendingTweet[index]]}</p>
                      {item}
                    </List.Item>
                  </Tooltip>
                );
              }}
            />
          )
          :
          (
            <List
              style={{
                backgroundColor: 'white',
              }}
              bordered
              dataSource={props.trendingHash}
              renderItem={item => {
                return (
                  <List.Item>
                    {item}
                  </List.Item>
                );
              }}
            />
          )
      }
    </div>
  );
};

export default Trends;