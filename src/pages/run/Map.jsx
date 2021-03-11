/*global google*/

import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useGeolocation } from 'react-use';

const MapContainer = () => {
  const geo = useGeolocation();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(()=> {
    console.log(geo)
    if(geo.loading === false) {
      setTimeout(() => {
        setLocation({ lat: geo.latitude, lng: geo.longitude } )
        console.log(location)
      }, 15000)
    }

  }, [geo.loading, location])

  const mapStyles = {
    width: '100%',
    height: '100vw',
    borderRadius: '50%',
  };

  return (
    <Map
      google={google}
      zoom={17}
      style={mapStyles}
      center={{ lat: location.lat, lng: location.lng }}
    />
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCBAqRASDDclvpGTwIV3ZzOgqrPp_WF8hc'
})(MapContainer);
