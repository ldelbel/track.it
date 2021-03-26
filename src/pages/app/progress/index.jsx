import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Progress.module.scss';
import Chart from './Chart';

const Progress = ({ runningSessions }) => {
  const allSpeeds = runningSessions.map((session) => session.avg_speed);
  const allPaces = runningSessions.map((session) => session.avg_pace);
  const allDistancesPerDay = runningSessions.map((session) => (
    [new Date(session.start_time).toDateString().slice(4, 10), session.distance]
  ));
  let speedOverallAvg = 0;
  let speedMaxValue = 0;
  let paceOverallAvg = 0;
  let paceMaxValue = 0;

  if (allSpeeds.length) {
    const speedTotal = allSpeeds.reduce((accumulator, currentValue) => accumulator + currentValue);
    speedOverallAvg = speedTotal / allSpeeds.length;
    speedMaxValue = Math.max(...allSpeeds);
  }

  if (allPaces.length) {
    const paceTotal = allPaces.reduce((accumulator, currentValue) => accumulator + currentValue);
    paceOverallAvg = paceTotal / allPaces.length;
    paceMaxValue = Math.max(...allPaces);
  }

  return (
    <>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content__title}>Your Progress</div>
          <div className={styles.content__chart}>
            <Chart distancesPerDay={allDistancesPerDay} />
          </div>
          <div className={styles.section}>
            <div className={styles.section__title}>
              Overall
            </div>
            <div className={styles.section__info}>
              <div className={styles.section__info__item}>
                <span>Avg Speed</span>
                <div className={styles.section__info__item__div}>
                  <div>
                    <span>{speedOverallAvg.toFixed(2)}</span>
                    <p>km/h</p>
                  </div>
                </div>
              </div>
              <div className={styles.section__info__item}>
                <span>Avg Pace</span>
                <div className={styles.section__info__item__div}>
                  <div>
                    <span>{paceOverallAvg.toFixed(2)}</span>
                    <p>h/km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section__title}>
              Personal Best
            </div>
            <div className={styles.section__info}>
              <div className={styles.section__info__item}>
                <span>Speed</span>
                <div className={styles.section__info__item__div}>
                  <div>
                    <span>{speedMaxValue.toFixed(2)}</span>
                    <p>km/h</p>
                  </div>
                </div>
              </div>
              <div className={styles.section__info__item}>
                <span>Pace</span>
                <div className={styles.section__info__item__div}>
                  <div>
                    <span>{paceMaxValue.toFixed(2)}</span>
                    <p>h/km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Progress.propTypes = {
  runningSessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.string,
      start_time: PropTypes.number,
      distance: PropTypes.number,
      duration: PropTypes.number,
      avg_speed: PropTypes.number,
      avg_pace: PropTypes.number,
      goal: PropTypes.number,
    }),
  ).isRequired,
};

export default Progress;
