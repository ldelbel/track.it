import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Menu.module.scss';
import MenuOption from './MenuOption';
import fromEntries from 'object.fromentries';

const Menu = () => {
  const location = useLocation();

  const [selected, setSelected] = useState({
    new: true,
    history: false,
    progress: false,
    more: false,
  });

  useEffect(()=>{
    let key = '';
    switch(location.pathname){
      case '/app/':
        key = 'new';
        break;
      case '/app/history':
        key = 'history';
        break;
      case '/app/progress':
        key = 'progress';
        break;
      case '/app/more':
        key = 'more';
        break;
      default:
        key = 'new';
    }
    handleUpdateSelected(key);
  },[location])

  console.log(location.pathname)

  if (!Object.fromEntries) {
    fromEntries.shim();
  }

  const defValue = (keyToCompare, keyReference) => {
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