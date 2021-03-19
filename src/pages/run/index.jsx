/*global google*/
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGeolocation } from 'react-use';
import { useStopwatch } from 'react-timer-hook';
import RunScreen from './RunScreen';
import Input from './Input';

const Run = props => {
  var location = useGeolocation();
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState({ list: [] });
  const [goal,setGoal] = useState(0);
  const [percentage,setPercentage] = useState(0);
  const savedBreadCrumbs = useRef();
  const { start, pause, reset, seconds, minutes, hours } = useStopwatch({ autoStart: false });
  var running = '';

  useEffect(() => {
    if(!location.loading){
      addBreadcrumb();
    }
  },[location.loading])

  useEffect(() => {
    savedBreadCrumbs.current = addBreadcrumb;
  }, [breadcrumbs])

  useEffect(() => {
    if(goal !== 0) {
      setPercentage(parseFloat(distance.toFixed(2))/goal);
    }
  },[distance, goal])

  const tick = () => {
    savedBreadCrumbs.current();
  }

  const startRunningSession = () => {
    running = setInterval(tick, 3000);
    setIsRunning(true);
    start();
  }

  const stopRunningSession = () => {
    clearInterval(running);
    setIsRunning(false);
    pause();
  }

  const addBreadcrumb = () => {
    var breadcrumb = { position: { lat: location.latitude, lng: location.longitude }, timestamp: location.timestamp };
    const newList = breadcrumbs.list.concat(breadcrumb);
    setBreadcrumbs({ list: newList });
    updateDistance();
  }

  const haversine_distance = (mk1, mk2) => {
    var R = 6371.0710; 
    var rlat1 = mk1.position.lat * (Math.PI/180); 
    var rlat2 = mk2.position.lat * (Math.PI/180); 
    var difflat = rlat2-rlat1; 
    var difflon = (mk2.position.lng-mk1.position.lng) * (Math.PI/180); 
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  
  const updateDistance = () => {
    if(breadcrumbs.list.length >= 2) {
      var newDist = distance + haversine_distance(breadcrumbs.list[breadcrumbs.list.length-1], breadcrumbs.list[breadcrumbs.list.length-2])
      setDistance(newDist);
    }
  }

  return (
    <>
      {isRunning ?
      (
        <RunScreen 
        percentage={percentage}
        distance={distance}
        stopRunningSession={stopRunningSession}
        goal={goal}
        clock={{ sec: seconds, min: minutes, hrs: hours}}    
        />
      ) : ( 
        <Input 
        setGoal={setGoal}
        startRunningSession={startRunningSession}      
        />
      )}
    </>
  );
}

Run.propTypes = {

}

export default Run;
