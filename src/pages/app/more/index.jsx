import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './styles/More.module.scss';

const More = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('runningSessions');
    history.push('/');
  }


  return (
    <main className={styles.bg}>
      <div className={styles.container}>       
        <button
        className={styles.button}
        onClick={logout}
        >
          Logout
        </button>
      </div>
    </main>
  )
}

More.propTypes = {

}

export default More;
