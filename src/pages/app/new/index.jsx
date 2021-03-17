import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './styles/New.module.scss';
import img from '../../../common/assets/running.png';

const New = props => {
  let history = useHistory();

  return (
    <main className={styles.bg}>
      <div className={styles.container}>
        <img className={styles.img} src={img} alt="run"/>
        <button
        className={styles.button}
        onClick={() => history.push('/run')}
        >
          New Running Session
        </button>
      </div>
    </main>
  );
}

New.propTypes = {

}

export default New;
