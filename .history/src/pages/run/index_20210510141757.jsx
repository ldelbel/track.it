import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGeolocation } from 'react-use';
import { useStopwatch } from 'react-timer-hook';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import RunScreen from './RunScreen';
import Input from './Input';
import { addRunningSession } from '../../actions';
import { postRunningSession } from '../../api';

const Run = ({ addRunningSession, id }) => {
  const location = useGeolocation();
  const [distance, setDistance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState({ list: [] });
  const [goal, setGoal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const savedBreadCrumbs = useRef();
  const {
    start, pause, reset, seconds, minutes, hours,
  } = useStopwatch({ autoStart: false });
  const history = useHistory();
  let running = '';

  useEffect(() => {
    if (!localStorage.user) {
      history.push('/');
    }

    location = useGeoLocation();

    
  }, []);

  const haversineDistance = (mk1, mk2) => {
    const R = 6371.0710;
    const rlat1 = mk1.position.lat * (Math.PI / 180);
    const rlat2 = mk2.position.lat * (Math.PI / 180);
    const difflat = rlat2 - rlat1;
    const difflon = (mk2.position.lng - mk1.position.lng) * (Math.PI / 180);
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2)
     * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2)
     * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  };

  const updateDistance = () => {
    if (breadcrumbs.list.length >= 2) {
      console.log(percentage);
      const displacement = haversineDistance(breadcrumbs.list[breadcrumbs.list.length - 1],
        breadcrumbs.list[breadcrumbs.list.length - 2]);
      setDistance((oldState) => oldState + displacement);
    }
  };

  const addBreadcrumb = () => {
    const breadcrumb = {
      position: {
        lat: location.latitude,
        lng: location.longitude,
      },
      timestamp: location.timestamp,
    };
    const newList = breadcrumbs.list.concat(breadcrumb);
    setBreadcrumbs({ list: newList });
    updateDistance();
  };

  useEffect(() => {
    if (!location.loading) {
      addBreadcrumb();
    }
  }, [location.loading]);

  useEffect(() => {
    savedBreadCrumbs.current = addBreadcrumb;
  }, [breadcrumbs]);

  useEffect(() => {
    if (goal !== 0) {
      setPercentage((parseFloat(distance.toFixed(2)) / goal) * 100);
    }
  }, [distance, goal]);

  const tick = () => {
    savedBreadCrumbs.current();
  };

  const startRunningSession = () => {
    running = setInterval(tick, 3000);
    setIsRunning(true);
    start();
    setTimestamp(Date.now());
  };

  const createSessionObject = (distance, duration, startTime, goal) => {
    const avg_speed = duration === 0 ? 0 : distance / duration;
    const avg_pace = distance === 0 ? 0 : duration / distance;

    const session = {
      distance,
      duration,
      start_time: startTime,
      goal,
      avg_speed,
      avg_pace,
    };
    return session;
  };

  const finishSession = () => {
    setBreadcrumbs({ list: [] });
    setGoal(0);
    setPercentage(0);
    setTimestamp(null);
    setDistance(0);
    reset();
    history.push('/app/history');
  };

  const stopRunningSession = () => {
    clearInterval(running);
    setIsRunning(false);
    pause();
    const duration = hours + minutes / 60 + seconds / 3600;
    const session = createSessionObject(distance, duration, timestamp, goal);
    addRunningSession(session);
    postRunningSession(id, session);
    finishSession();
  };

  return (
    <>
      {isRunning
        ? (
          <RunScreen
            percentage={percentage}
            distance={distance}
            stopRunningSession={stopRunningSession}
            goal={goal}
            clock={{ sec: seconds, min: minutes, hrs: hours }}
          />
        ) : (
          <Input
            setGoal={setGoal}
            startRunningSession={startRunningSession}
          />
        )}
    </>
  );
};

Run.propTypes = {
  addRunningSession: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect((state) => state, { addRunningSession })(Run);
