import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const PieChart = props => {

  const [pieChartData, setPieChartData] = useState();

  useEffect(() => {
    const percentArray = [];
    for (var i in props.indivudualSentiments) {
      percentArray.push(100 * (props.indivudualSentiments[i] / props.totalSentiments));
    }
    setPieChartData({
      labels: props.toneLabels,
      datasets: [
        {
          label: 'Sentiments',
          backgroundColor: [
            '#FF0000',
            '#FF7F00',
            '#FFFF00',
            '#00FF00',
            '#0000FF',
            '#2E2B5F',
            '#8B00FF',
            '#b8b8b8'
          ],
          hoverBackgroundColor: [
            '#501800',
            '#5c2f02',
            '#4B5000',
            '#175000',
            '#003350',
            '#1c1a38',
            '#35014F',
            '#5e5e5e'
          ],
          data: percentArray,
        }
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
      <Doughnut
        data={pieChartData}
        options={{
          responsive: true,
          title: {
            display: true,
            text: 'Percentage of Sentiments',
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

export default PieChart;