import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const Chart = props => {
  const { distancesPerDay } = props;
  const lastThirtyDays = [...new Array(30)].map((i, idx) => moment().startOf("day").subtract(idx, "days"));
  const last30days = lastThirtyDays.map(day => {
    return day._d.toDateString().slice(4,10)
  })

  const labels = last30days.reverse();
  const objToChart = labels.reduce((acc,curr)=> (acc[curr]=0,acc),{});
  console.log(objToChart)
  console.log(distancesPerDay)

  const distancesTest = [
    ["Mar 22", 3.2],
    ["Mar 21", 2.1],
    ["Mar 20", 1.5],
    ["Mar 19", 5.1],
    ["Mar 18", 4.3]
  ]
  
  distancesTest.forEach(dist => {
    if(labels.includes(dist[0])){
      objToChart[dist[0]] = dist[1];
    }
  })
  
  const dataSet = Object.values(objToChart);

  const data = {
    chartData: {
      labels: labels,
      datasets: [
        {
          label: 'Distance (km)',
          data: dataSet,
          backgroundColor: '#97E493',
          hoverBackgroundColor: '#27E493'
        }
      ]
    }
  }

  return (
    <div style={{ position: 'relative', width: '90vw'}}>
      <Bar
        data={data.chartData}
        options={{ maintainAspectRatio: true }}
        responsive={true}
      />
    </div>
  )
}

Chart.propTypes = {

}

export default Chart;
