import React from 'react';
import PropTypes from 'prop-types';
import RunningSession from './RunningSession';
import styles from './styles/History.module.scss';

const History = props => {
  return (
    <main className={styles.bg}>
      <div>
        <RunningSession />
      </div>
    </main>
  );
}

History.propTypes = {

}

export default History;
