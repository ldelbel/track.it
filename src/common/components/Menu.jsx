import React, { useState } from 'react';
import styles from '../styles/Menu.module.scss';
import MenuOption from './MenuOption';

const Menu = () => {
  const [selected, setSelected] = useState({
    new: true,
    history: false,
    progress: false,
    more: false,
  });

  const defValue = (keyToCompare, keyReference ,value) => {
    return keyToCompare === keyReference ? true : false
  }

  const toggle = (obj, key, fn) => (
    Object.fromEntries(
      Object.entries(obj).map(
        ([k, v]) => [k, fn(k,key,v)]
      )
    )
  )

  const handleUpdateSelected = (key) => {
    setSelected(toggle(selected,key, defValue))
  }

  return (
    <div className={styles.container}>
      <MenuOption page={'new'} selected={selected.new} handleUpdateSelected={handleUpdateSelected} />
      <MenuOption page={'history'} selected={selected.history} handleUpdateSelected={handleUpdateSelected} />
      <MenuOption page={'progress'} selected={selected.progress} handleUpdateSelected={handleUpdateSelected} />
      <MenuOption page={'more'} selected={selected.more} handleUpdateSelected={handleUpdateSelected} />
    </div>
  );
}

export default Menu;