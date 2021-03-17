import React from 'react'
import PropTypes from 'prop-types'
import { Bar, Line, Pie } from 'react-chartjs-2';

const Chart = props => {
  const data = {
    chartData: {
      labels: ['Sep 5', 'Sep 6', 'Sep 7', 'Sep 8', 'Sep 9','Sep 10',
       'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16', 'Sep 17',
        'Sep 18', 'Sep 19','Sep 25', 'Sep 26', 'Sep 27', 'Sep 28', 'Sep 29'
      ],
      datasets: [
        {
          label: 'Distance (km)',
          data: [
            1.54,
            2.35,
            1.89,
            0.56,
            3.9,
            0,
            1.54,
            2.35,
            1.89,
            0.56,
            3.9,
            0,
            1.54,
            2.35,
            1.89,
            0.56,
            3.9,
            0,
            1,
            2
          ],
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
