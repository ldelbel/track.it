/*global google*/
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGeolocation } from 'react-use';
import { useStopwatch } from 'react-timer-hook';
import { useHistory } from 'react-router-dom';
import RunScreen from './RunScreen';
import Input from './Input';
import { connect } from 'react-redux';
import { addRunningSession } from '../../actions';
import { postRunningSession } from '../../api';

const Run = ({ addRunningSession, id, runningSessions }) => {
  var location = useGeolocation();
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState({ list: [] });
  const [goal,setGoal] = useState(0.0);
  const [percentage,setPercentage] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const savedBreadCrumbs = useRef();
  const { start, pause, reset, seconds, minutes, hours } = useStopwatch({ autoStart: false });
  let history = useHistory();
  var running = '';

  useEffect(()=> {
    if(!localStorage['user']){
      history.push('/');
    }
  },[])

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
    setTimestamp(Date.now());
  }

  const stopRunningSession = () => {
    clearInterval(running);
    setIsRunning(false);
    pause();
    reset();
    const duration = hours + minutes / 60 + seconds / 3600;
    const session = createSessionObject(distance, duration, timestamp, goal);
    addRunningSession(session);
    postRunningSession(id, session);
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

  const createSessionObject = (distance, duration, startTime, goal) => {
    const avg_speed = duration === 0 ? 0 : distance / duration;
    const avg_pace = distance === 0 ? 0 : duration / distance;
    
    const session = { 
      distance: distance,
      duration: duration,
      start_time: startTime,
      goal: goal,
      avg_speed: avg_speed,
      avg_pace: avg_pace,
    }
    return session;
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

export default connect(state => state, { addRunningSession })(Run);
