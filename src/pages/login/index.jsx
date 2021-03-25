import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles/Login.module.scss';
import { setUser } from '../../actions';

const Login = ({ setUser }) => {
  const [name, setName] = useState();
  const [error,setError] = useState(false);
  const [errorStyle, setErrorStyle] = useState(styles.hidden)
  let history = useHistory();

  useEffect(()=>{
    if(localStorage['user']) {
      history.push('./app')
    }
  }, [])

  const handleChange = (e) => {
    if(e.target.value){
      setErrorStyle(styles.hidden)
    }
    setName(e.target.value);
  }

  const handleClick = () => {
    if(!name){
      setErrorStyle(styles.error);
    } else {
      setUser(name);
      localStorage.setItem('user', name);
      history.push('/app');
    }

  }
  
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.content__title}>Track.it</h1>
        <div className={styles.content__input}>
          <span>Enter your name</span>
          <input type="text" onChange={e => handleChange(e)} data-testid={'input'} />
          <p className={errorStyle}>Please provide a name to login</p>
          <input type="submit" value="Login" onClick={handleClick} data-testid={'login'} />
        </div>
      </div>
    </main>
  );
}

Login.propTypes = {
  setUser: PropTypes.func,
}

export default connect(state => state, { setUser })(Login);
