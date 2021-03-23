import React from 'react';
import PropTypes from 'prop-types';
import RunningSession from './RunningSession';
import styles from './styles/History.module.scss';

const History = ({ runningSessions }) => {

  return (
      <main className={styles.bg}>
        <div className={styles.container}>
          { runningSessions.length ? (
            runningSessions.map(session => (
              <RunningSession session={session} key={session.id}/>
            ))       
          ) : (
            <>
              <div className={styles.noentries}>No entries yet</div>
              <div className={styles.shame}>(shame on you)</div>
            </>
          )  
          }
        </div>
      </main>
  );
}

History.propTypes = {

}

export default History;
