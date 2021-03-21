import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './styles/Input.module.scss';

const Input = props => {
  const {setGoal, startRunningSession} = props;
  const [number,setNumber] = useState({ n1: 0, n2: 0, n3: 0, n4: 0});

  const defineGoal = () => {
    let goal = parseFloat(`${number.n1}${number.n2}.${number.n3}${number.n4}`);
    setGoal(goal);
  }

  const handleClick = () => {
    defineGoal();
    startRunningSession();
  }

  const addNumber = (num) => {
    let value = number[num];
    setNumber({ ...number,  [`${num}`]: value + 1 });
  }

  const subtractNumber = (num) => {
    let value = number[num];    
    if(value >= 1) {
      setNumber({ ...number,  [`${num}`]: value - 1 });
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <span className={styles.content__title}>SET YOUR GOAL FOR TODAY</span>
        <div className={styles.content__inputs}>
          <div className={styles.input}>
            <button
            onClick={() => addNumber('n1')}
            className={styles.input__btn_add}>+</button>
            <div className={styles.input__display}>
              {number.n1}
            </div>
            <button
            onClick={() => subtractNumber('n1')}
            className={styles.input__btn_sub}>-</button>
          </div>
          <div className={styles.input}>
            <button
            onClick={() => addNumber('n2')}
            className={styles.input__btn_add}>+</button>
            <div className={styles.input__display}>
              {number.n2}
            </div>
            <button
            onClick={() => subtractNumber('n2')}
            className={styles.input__btn_sub}>-</button>
          </div>
          <div className={styles.dot}><p>.</p></div>
          <div className={styles.input}>
            <button
            onClick={() => addNumber('n3')}
            className={styles.input__btn_add}>+</button>
            <div className={styles.input__display}>
              {number.n3}
            </div>
            <button
            onClick={() => subtractNumber('n3')}
            className={styles.input__btn_sub}>-</button>
          </div>
          <div className={styles.input}>
            <button
            onClick={() => addNumber('n4')}
            className={styles.input__btn_add}>+</button>
            <div className={styles.input__display}>
              {number.n4}
            </div>
            <button
            onClick={() => subtractNumber('n4')}
            className={styles.input__btn_sub}>-</button>
          </div>
          <div className={styles.measure}>
             Km
          </div>
        </div>
        <button
        className={styles.btn}
        onClick={handleClick}>Start Running Session</button>
      </div>
    </main>
  )
}

Input.propTypes = {

}

export default Input;
