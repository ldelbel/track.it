import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/New.module.scss';
import img from '../../../common/assets/running.png';

const New = () => {
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

export default New;
