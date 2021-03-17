import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Progress.module.scss';
import Chart from './Chart';

const Progress = props => {
      
  return (
    <>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content__title}>Your Progress</div>
          <div className={styles.content__chart}>
            <Chart />
          </div>
          <div className={styles.section}>
            <div className={styles.section__title}>
              Overall
            </div>
            <div className={styles.section__info}>
              <div className={styles.section__info__item}>
                <span>Avg Speed</span>
                <div div className={styles.section__info__item__div}>
                  <div>
                    <span>56</span>
                    <p>km/h</p>
                  </div>
                </div>
              </div>
              <div className={styles.section__info__item}>
                <span>Avg Pace</span>
                <div div className={styles.section__info__item__div}>
                  <div>
                    <span>56</span>
                    <p>h/km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section__title}>
              Personal Best
            </div>
            <div className={styles.section__info}>
              <div className={styles.section__info__item}>
                <span>Avg Speed</span>
                <div div className={styles.section__info__item__div}>
                  <div>
                    <span>56</span>
                    <p>km/h</p>
                  </div>
                </div>
              </div>
              <div className={styles.section__info__item}>
                <span>Avg Pace</span>
                <div div className={styles.section__info__item__div}> 
                  <div>
                    <span>56</span>
                    <p>h/km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Progress.propTypes = {

}

export default Progress;
