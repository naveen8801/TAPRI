import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import FoodStallsMarker from './FoodStallsMarker';
import { getUsers } from '../Service/api';
import TeaStallsMarker from './TeaStallMarker';
import GroceryShopsMarker from './GroceryShopMarker';


const Map = ({ center, zoom }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };
  const marker=(users.map(ev=>{
     if(ev.category=== 'FOOD'){
     return  <FoodStallsMarker lat={ev.lat} lng={ev.lng}/>
     }
     if(ev.category=== 'TEA')
     {
       return <TeaStallsMarker lat={ev.lat} lng={ev.lng}/>
     }
     if(ev.category === 'GROCERY')
     {
       return <GroceryShopsMarker lat={ev.lat} lng={ev.lng}/>
     }
  }))
  return (

    <div style={{ height: '100vh', width: '100%', position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {marker}
       
      </GoogleMapReact>
    </div>
  );
}
Map.defaultProps = {
  center: {
    lat: 22.5745,
    lng: 88.4338
  },
  zoom: 16
};
export default Map;