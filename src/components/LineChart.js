import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';

const LineChart = props => {

  const [lineGraphData, setLineGraphData] = useState();

  useEffect(() => {
    const dateLabels = [];
    const angerArray = [];
    const fearArray = [];
    const joyArray = [];
    const sadnessArray = [];
    const analyticalArray = [];
    const confidentArray = [];
    const tentativeArray = [];
    const disgustArray = [];
    for (var date in props.datewiseTweetTrends) {
      dateLabels.push(date);
      angerArray.push(props.datewiseTweetTrends[date]['anger']);
      disgustArray.push(props.datewiseTweetTrends[date]['disgust']);
      fearArray.push(props.datewiseTweetTrends[date]['fear']);
      joyArray.push(props.datewiseTweetTrends[date]['joy']);
      sadnessArray.push(props.datewiseTweetTrends[date]['sadness']);
      analyticalArray.push(props.datewiseTweetTrends[date]['analytical']);
      confidentArray.push(props.datewiseTweetTrends[date]['confident']);
      tentativeArray.push(props.datewiseTweetTrends[date]['tentative']);
    }
    dateLabels.reverse();
    angerArray.reverse();
    fearArray.reverse();
    joyArray.reverse();
    sadnessArray.reverse();
    analyticalArray.reverse();
    confidentArray.reverse();
    tentativeArray.reverse();
    disgustArray.reverse();
    setLineGraphData({
      labels: dateLabels,
      datasets: [
        {
          label: 'anger',
          borderColor: "#FF0000",
          // fill: false,
          data: angerArray,
        },
        {
          label: 'disgust',
          borderColor: "#FF7F00",
          // fill: false,
          data: disgustArray,
        },
        {
          label: 'fear',
          borderColor: "#FFFF00",
          // fill: false,
          data: fearArray,
        },
        {
          label: 'joy',
          borderColor: "#b8b8b8",
          // fill: false,
          data: joyArray,
        },
        {
          label: 'sadness',
          borderColor: "#00FF00",
          // fill: false,
          data: sadnessArray,
        },
        {
          label: 'analytical',
          borderColor: "#0000FF",
          // fill: false,
          data: analyticalArray,
        },
        {
          label: 'confident',
          borderColor: "#2E2B5F",
          // fill: false,
          data: confidentArray,
        },
        {
          label: 'tentative',
          borderColor: "#8B00FF",
          // fill: false,
          data: tentativeArray,
        },
      ]
    });
  }, []);
  return (
    <Card style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 40,
      boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
      padding: 30,
      margin: 50
    }}>
      <Line
        data={lineGraphData}
        options={{
          responsive: true,
          title: {
            display: true,
            text: 'Trends of Sentiments',
            fontSize: 40
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              fontSize: 20
            }
          }
        }}
      />
    </Card>
  );
};

export default LineChart;