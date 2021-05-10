import React from 'react';
import PropTypes from 'prop-types';
import RunningSession from './RunningSession';
import styles from './styles/History.module.scss';

const History = ({ runningSessions }) => {(
  <main className={styles.bg}>
    <div className={styles.container}>
      { runningSessions.length ? (
        runningSessions.map((session) => (
          <RunningSession session={session} key={session.id} />
        ))
      ) : (
        <>
          <div className={styles.noentries}>No entries yet</div>
          <div className={styles.shame}>(shame on you)</div>
        </>
      )}
    </div>
  </main>
)};

History.propTypes = {
  runningSessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.string,
      distance: PropTypes.number,
      duration: PropTypes.number,
      avg_speed: PropTypes.number,
      avg_pace: PropTypes.number,
      goal: PropTypes.number,
    }),
  ).isRequired,
};

export default History;
