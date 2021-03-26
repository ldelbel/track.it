import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fromEntries from 'object.fromentries';
import styles from '../styles/Menu.module.scss';
import MenuOption from './MenuOption';

const Menu = () => {
  const location = useLocation();
  const [selected, setSelected] = useState({
    new: true,
    history: false,
    progress: false,
    more: false,
  });

  const defValue = (keyToCompare, keyReference) => (keyToCompare === keyReference);

  const toggle = (obj, key, fn) => (
    Object.fromEntries(
      Object.entries(obj).map(
        ([k, v]) => [k, fn(k, key, v)],
      ),
    )
  );

  const handleUpdateSelected = (key) => {
    setSelected(toggle(selected, key, defValue));
  };

  useEffect(() => {
    let key = '';
    switch (location.pathname) {
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
  }, [location]);

  if (!Object.fromEntries) {
    fromEntries.shim();
  }

  return (
    <div className={styles.container}>
      <MenuOption page="new" selected={selected.new} />
      <MenuOption page="history" selected={selected.history} />
      <MenuOption page="progress" selected={selected.progress} />
      <MenuOption page="more" selected={selected.more} />
    </div>
  );
};

export default Menu;
