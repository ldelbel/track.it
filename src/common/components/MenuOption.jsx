import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlinePlus, AiOutlineHistory, AiFillPieChart } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { RiMoreFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import styles from '../styles/MenuOption.module.scss';

const MenuOption = props => {
  const { page } = props;
  
  let content = (
    <>
      <IconContext.Provider value={{ 'size': '0.6em'}}>
        <AiOutlinePlus /> 
      </IconContext.Provider>          
      <FaRunning />
    </>
  );

  let name = '';

  switch(page) {
    case 'new':
      content = (
        <>
          <IconContext.Provider value={{ 'size': '0.6em'}}>
            <AiOutlinePlus /> 
          </IconContext.Provider>          
          <FaRunning />
        </>
      );
      name = 'New Run'
      break;
    case 'history':
      content = <AiOutlineHistory />;
      name = 'History';
      break;
    case 'progress':
      content = <AiFillPieChart />;
      name = 'Your Progress';
      break;
    case 'more':
      content = <RiMoreFill />;
      name = 'More';
      break;
    default:
  }
    
  return (
    <div className={styles.container}>
      <div className={styles.container__div}>
        <span>
          {content}
        </span>
        <p>{name}</p>
      </div>
    </div>
  );
}

MenuOption.propTypes = {

}

export default MenuOption;
