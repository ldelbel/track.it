/*global google*/

import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';


const MapContainer = props => {
  

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
      center={{ lat: props.location.lat, lng: props.location.lng }}
    />
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCBAqRASDDclvpGTwIV3ZzOgqrPp_WF8hc'
})(MapContainer);
