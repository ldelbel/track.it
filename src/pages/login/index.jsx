import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { userID, fetchUserData, createUser } from '../../api';

const Login = props => {
  
  useEffect(()=> {
    userID('novo');
  }, [])
  
  return (
    <div>
      Login
    </div>
  );
}

Login.propTypes = {

}

export default Login;
