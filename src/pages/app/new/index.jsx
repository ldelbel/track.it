import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/New.module.scss';
import img from '../../../common/assets/running.png';

const New = props => {
  return (
    <main className={styles.bg}>
      <div className={styles.container}>
        <img className={styles.img} src={img} alt="run"/>
        <button className={styles.button}>
          New Running Session
        </button>
      </div>
    </main>
  );
}

New.propTypes = {

}

export default New;
