import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/RunScreen.module.scss';
import { BsClockHistory } from 'react-icons/bs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RunScreen = props => {
  const { percentage, distance, stopRunningSession, goal, clock } = props;
  const format = (num) => {
    return (
      num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.clock}><BsClockHistory /> <p>{`${format(clock.hrs)}:${format(clock.min)}:${format(clock.sec)}`}</p></div>
      <div className={styles.goal}><span>Goal:</span> <p>{goal} km</p></div>
      <div className={styles.content}>
        <CircularProgressbar
        value={percentage}
        text={`${distance.toFixed(2)} km`}
        background={true}
        strokeWidth={'4'}
        styles={buildStyles({
          pathColor: 'var(--green)',
          textColor: 'var(--darker)',
          trailColor: '#f3f3f3',
          backgroundColor: '#fff',
        })}
        />;
      </div>
      <button onClick={stopRunningSession} className={styles.stopbtn}>Finish</button>
    </main>
  )
}

RunScreen.propTypes = {

}

export default RunScreen;
