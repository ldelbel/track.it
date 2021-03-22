import React from 'react';
import PropTypes from 'prop-types';
import RunningSession from './RunningSession';
import styles from './styles/History.module.scss';

const History = props => {
  const { runningSessions } = props;
  console.log(runningSessions)
  return (
    <main className={styles.bg}>
      <div className={styles.container}>

        {
          runningSessions.map(session => (
            <RunningSession session={session} key={session.id}/>
          ))          
        }
      </div>
    </main>
  );
}

History.propTypes = {

}

export default History;
