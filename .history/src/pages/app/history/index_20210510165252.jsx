import React from 'react';
import PropTypes from 'prop-types';
import RunningSession from './RunningSession';
import styles from './styles/History.module.scss';

const History = ({ runningSessions }) => {
  const sorted = runningSessions.sort((a, b) => (
    if (a.start_time > b.start_time) {
      return 1
    } 1 : ((b.start_time > a.start_time) ? -1 : 0)
  ));

  console.log(sorted);

  return (
    <main className={styles.bg}>
      <div className={styles.container}>
        {runningSessions.length ? (
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
  );
};

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
      start_time: PropTypes.number,
    }),
  ).isRequired,
};

export default History;
