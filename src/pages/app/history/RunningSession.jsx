import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/RunningSession.module.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RunningSession = ({ session }) => {
  const date = new Date(session.start_time);
  let percentage = 0.0;
  session.goal ? percentage = 100 * (session.distance / session.goal) : percentage = 0;

  return (
    <div className={styles.container}>
      <div className={styles.container__leftdiv}>
        <div className={styles.container__leftdiv__progressbar}>
          <CircularProgressbar
          value={percentage}
          background={true}
          strokeWidth={'14'}
          styles={buildStyles({
            pathColor: 'var(--green)',
            textColor: 'var(--darker)',
            trailColor: '#f3f3f3',
            backgroundColor: '#fff',
          })}
          />
        </div>
        <div className={styles.container__leftdiv__info}>
          <span>{date.toDateString()}</span>
          <p>{percentage}% of the goal</p>
        </div>
      </div>
      <div className={styles.container__rightdiv}>
        <div className={styles.container__rightdiv__info}>
          <span>{session.distance}</span>
          <p>km</p>
        </div>
      </div>
    </div>
  );
}

RunningSession.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.string,
    distance: PropTypes.number,
    duration: PropTypes.number,
    avg_speed: PropTypes.number,
    avg_pace: PropTypes.number,
    goal: PropTypes.number,
  })
}

export default RunningSession;
