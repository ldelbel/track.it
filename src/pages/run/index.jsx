/*global google*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleApiWrapper from './Map';
import { useGeolocation } from 'react-use';

const Run = props => {
  var location = useGeolocation();
  const [distance, setDistance] = useState(0);
  var breadcrumbs = [];
  console.log(distance)

  const haversine_distance = (mk1, mk2) => {
    var R = 6371.0710; // Radius of the Earth in kilometers
    var rlat1 = mk1.position.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng-mk1.position.lng * (Math.PI/180)); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

  const addBreadcrumb = () => {
    const { latitude, longitude, timestamp } = location;
    var breadcrumb = { position: { lat: latitude, lng: longitude }, timestamp: timestamp };
    breadcrumbs.push(breadcrumb);
    updateDistance();
  }

  const updateDistance = () => {
    if(breadcrumbs.length >= 2) {
      var newDist = distance + haversine_distance(breadcrumbs[breadcrumbs.length-1], breadcrumbs[breadcrumbs.length-2])
      setDistance(newDist);
    }
  }

  useEffect(() => {
    if(!location.loading){
      addBreadcrumb();
      var running = setInterval(addBreadcrumb, 15000)
      // clearInterval(running)
    }
  },[location.loading])

  return (
    <>
      <div>
        {distance}
      </div>      
    </>
  );
}

Run.propTypes = {

}

export default Run;
