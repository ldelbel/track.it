import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const Chart = ({ distancesPerDay }) => {
  const lastThirtyDays = [...new Array(30)].map((i, idx) => moment().startOf('day').subtract(idx, 'days'));
  const last30days = lastThirtyDays.map((day) => day._d.toDateString().slice(4, 10));

  const labels = last30days.reverse();
  const objToChart = labels.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});

  distancesPerDay.forEach((dist) => {
    const [key, value] = dist;
    if (labels.includes(key)) {
      objToChart[key] = value;
    }
  });

  const dataSet = Object.values(objToChart);

  const data = {
    chartData: {
      labels,
      datasets: [
        {
          label: 'Distance (km)',
          data: dataSet,
          backgroundColor: '#97E493',
          hoverBackgroundColor: '#27E493',
        },
      ],
    },
  };

  return (
    <div style={{
      position: 'relative', width: '90vw', maxWidth: '500px',
    }}
    >
      <Bar
        data={data.chartData}
        options={{ maintainAspectRatio: true }}
        responsive
      />
    </div>
  );
};

Chart.propTypes = {
  distancesPerDay: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Chart;
