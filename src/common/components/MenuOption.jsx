import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import { AiOutlinePlus, AiOutlineHistory, AiFillPieChart } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { RiMoreFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import styles from '../styles/MenuOption.module.scss';


const MenuOption = props => {
  const { page, selected , handleUpdateSelected } = props;
  const [style, setStyle] = useState();
  let history = useHistory();
   
  useEffect(()=>{
    selected ? (
      setStyle(styles.container_selected)
    ) : (
      setStyle(styles.container_notselected)
    )
  }, [selected])

  const handleClick = () => {
    handleUpdateSelected(page);
    page === 'new' ? (
      history.push(`/app/`)
    ) : (
      history.push(`/app/${page}`)
    )
  }

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
    <button
    className={style}
    onClick={handleClick}>
      <div>
        <span>
          {content}
        </span>
        <p>{name}</p>
      </div>
    </button>
  );
}

MenuOption.propTypes = {

}

export default MenuOption;
