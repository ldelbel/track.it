import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import styles from './styles/Input.module.scss';

const Input = ({ setGoal, startRunningSession }) => {
  const [number, setNumber] = useState({
    n1: 0, n2: 0, n3: 0, n4: 0,
  });
  const history = useHistory();

  const defineGoal = () => {
    const goal = parseFloat(`${number.n1}${number.n2}.${number.n3}${number.n4}`);
    setGoal(goal);
  };

  const handleClick = () => {
    defineGoal();
    startRunningSession();
  };

  const backToMenu = () => {
    history.push('/app');
  };

  const addNumber = (num) => {
    const value = number[num];
    setNumber({ ...number, [`${num}`]: value + 1 });
  };

  const subtractNumber = (num) => {
    const value = number[num];
    if (value >= 1) {
      setNumber({ ...number, [`${num}`]: value - 1 });
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.arrow}>
          <button type="button" aria-label="back" onClick={backToMenu}>
            <HiArrowNarrowLeft />
          </button>
        </div>
        <span className={styles.content__title}>SET YOUR GOAL FOR TODAY</span>
        <div className={styles.content__inputs}>
          <div className={styles.input}>
            <button
              type="button"
              onClick={() => addNumber('n1')}
              className={styles.input__btn_add}
            >
              +
            </button>
            <div className={styles.input__display}>
              {number.n1}
            </div>
            <button
              type="button"
              onClick={() => subtractNumber('n1')}
              className={styles.input__btn_sub}
            >
              -
            </button>
          </div>
          <div className={styles.input}>
            <button
              type="button"
              onClick={() => addNumber('n2')}
              className={styles.input__btn_add}
              data-testid="plusOneKm"
            >
              +
            </button>
            <div className={styles.input__display}>
              {number.n2}
            </div>
            <button
              type="button"
              onClick={() => subtractNumber('n2')}
              className={styles.input__btn_sub}
            >
              -
            </button>
          </div>
          <div className={styles.dot}><p>.</p></div>
          <div className={styles.input}>
            <button
              type="button"
              onClick={() => addNumber('n3')}
              className={styles.input__btn_add}
            >
              +
            </button>
            <div className={styles.input__display}>
              {number.n3}
            </div>
            <button
              type="button"
              onClick={() => subtractNumber('n3')}
              className={styles.input__btn_sub}
            >
              -
            </button>
          </div>
          <div className={styles.input}>
            <button
              type="button"
              onClick={() => addNumber('n4')}
              className={styles.input__btn_add}
            >
              +
            </button>
            <div className={styles.input__display}>
              {number.n4}
            </div>
            <button
              type="button"
              onClick={() => subtractNumber('n4')}
              className={styles.input__btn_sub}
            >
              -
            </button>
          </div>
          <div className={styles.measure}>
            Km
          </div>
        </div>
        <button
          type="button"
          className={styles.btn}
          onClick={handleClick}
        >
          Start Running Session
        </button>
      </div>
    </main>
  );
};

Input.propTypes = {
  setGoal: PropTypes.func.isRequired,
  startRunningSession: PropTypes.func.isRequired,
};

export default Input;
