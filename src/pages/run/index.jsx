/*global google*/
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleApiWrapper from './Map';
import { useGeolocation } from 'react-use';
import styles from './styles/Run.module.scss';
import { BsClockHistory } from 'react-icons/bs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Run = props => {
  var location = useGeolocation();
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState({ list: [] });
  const savedBreadCrumbs = useRef();
  var running = '';

  useEffect(() => {
    if(!location.loading){
      addBreadcrumb();
    }
  },[location.loading])

  useEffect( () => {
    savedBreadCrumbs.current = addBreadcrumb;
  }, [breadcrumbs])

  const tick = () => {
    savedBreadCrumbs.current();
  }

  const startRunningSession = () => {
    running = setInterval(tick, 3000);
    setIsRunning(true);
  }

  const stopRunningSession = () => {
    clearInterval(running);
    setIsRunning(false);
  }

  const addBreadcrumb = () => {
    var breadcrumb = { position: { lat: location.latitude, lng: location.longitude }, timestamp: location.timestamp };
    const newList = breadcrumbs.list.concat(breadcrumb);
    setBreadcrumbs({ list: newList });
    updateDistance();
  }

  const haversine_distance = (mk1, mk2) => {
    var R = 6371.0710; // Radius of the Earth in kilometers
    var rlat1 = mk1.position.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng-mk1.position.lng) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  
  const updateDistance = () => {
    if(breadcrumbs.list.length >= 2) {
      var newDist = distance + haversine_distance(breadcrumbs.list[breadcrumbs.list.length-1], breadcrumbs.list[breadcrumbs.list.length-2])
      console.log(newDist)
      setDistance(newDist);
    }
  }

  const percentage = 80;
  return (
    <>
      <main className={styles.container}>
        <div className={styles.clock}><BsClockHistory /> <p>00:00:00</p></div>
        <div className={styles.goal}><span>Goal:</span> <p>10.25 km</p></div>
        <div className={styles.content}>
          <CircularProgressbar
          value={percentage}
          text={`${distance.toFixed(2)} km`}
          background={true}
          strokeWidth={'4'}
          styles={buildStyles({
            pathColor: 'var(--green)',
            textColor: 'var(--darker)',
            trailColor: '#f3f3f3',
            backgroundColor: '#fff',
          })}
          />;
        </div>
        <button onClick={stopRunningSession} className={styles.stopbtn}>Finish</button>
      </main>
    </>
  );
}

Run.propTypes = {

}

export default Run;
