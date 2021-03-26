import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineHistory, AiFillPieChart } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { RiMoreFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import styles from '../styles/MenuOption.module.scss';

const MenuOption = (props) => {
  const { page, selected } = props;
  const [style, setStyle] = useState();
  const history = useHistory();

  useEffect(() => {
    if (selected) {
      setStyle(styles.container_selected);
    } else {
      setStyle(styles.container_notselected);
    }
  }, [selected]);

  const handleClick = () => {
    if (page === 'new') {
      history.push('/app/');
    } else {
      history.push(`/app/${page}`);
    }
  };

  let content = (
    <>
      <IconContext.Provider value={{ size: '0.6em' }}>
        <AiOutlinePlus />
      </IconContext.Provider>
      <FaRunning />
    </>
  );

  let name = '';

  switch (page) {
    case 'new':
      content = (
        <>
          <IconContext.Provider value={{ size: '0.6em' }}>
            <AiOutlinePlus />
          </IconContext.Provider>
          <FaRunning />
        </>
      );
      name = 'New Run';
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
      type="button"
      className={style}
      onClick={handleClick}
    >
      <div>
        <span>
          {content}
        </span>
        <p>{name}</p>
      </div>
    </button>
  );
};

MenuOption.propTypes = {
  page: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default MenuOption;
