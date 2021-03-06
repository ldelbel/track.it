import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/More.module.scss';

const More = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('runningSessions');
    history.push('/');
  };

  return (
    <main className={styles.bg}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.button}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default More;
