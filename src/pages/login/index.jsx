import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles/Login.module.scss';
import { setUser } from '../../actions';



const Login = props => {
  const [name, setName] = useState();
  const { setUser } = props;
  let history = useHistory();

  useEffect(()=>{
    if(localStorage['user']) {
      history.push('./app')
    }
  }, [])

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleClick = () => {
    setUser(name);
    localStorage.setItem('user', name);
    history.push('/app');
  }
  
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.content__title}>Track.it</h1>
        <div className={styles.content__input}>
          <span>Please enter your name</span>
          <input type="text" onChange={e => handleChange(e)}/>
          <input type="submit" value="Login" onClick={handleClick}/>
        </div>
      </div>
    </main>
  );
}

Login.propTypes = {

}

export default connect(state => state, { setUser })(Login);
