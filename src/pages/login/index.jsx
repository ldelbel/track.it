import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userID, fetchUserData, createUser } from '../../api';
import styles from './styles/Login.module.scss';
import { setUser } from '../../actions';


const Login = props => {
  const [name, setName] = useState();
  const { setUser } = props;
  let history = useHistory();

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleClick = () => {
    setUser(name);
    history.push('/app');
  }
  
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.content__title}>Track.it</h1>
        <div className={styles.content__input}>
          <span>Please enter your name</span>
          <input type="text" onChange={e => handleChange(e)}/>
          <input type="submit" onClick={handleClick}/>
        </div>
      </div>
    </main>
  );
}

Login.propTypes = {

}

export default connect(state => state, { setUser })(Login);
