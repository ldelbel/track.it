import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/RunningSession.module.scss';

const RunningSession = props => {
  return (
    <div className={styles.container}>
      <div className={styles.container__leftdiv}>
        <div className={styles.container__leftdiv__progressbar}></div>
        <div className={styles.container__leftdiv__info}>
          <span>Sep 5 2013</span>
          <p>80% of the goal</p>
        </div>
      </div>
      <div>
        <div>
          <span>-0.4</span>
          <p>lbs</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

RunningSession.propTypes = {

}

export default RunningSession;
