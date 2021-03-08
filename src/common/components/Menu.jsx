import React from 'react';
import styles from '../styles/Menu.module.scss';
import MenuOption from './MenuOption';

const Menu = () => {
  return (
    <div className={styles.container}>
      <MenuOption page={'new'} />
      <MenuOption page={'history'} />
      <MenuOption page={'progress'} />
      <MenuOption page={'more'} />
    </div>
  );
}

export default Menu;