import React, { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl, Overlay } from 'pigeon-maps';
import { makeStyles, Card } from '@material-ui/core';
import FoodStallsMarker from './FoodStallsMarker';
import { getUsers } from '../Service/api';
import TeaStallsMarker from './TeaStallMarker';
import GroceryShopsMarker from './GroceryShopMarker';
import LocationInfo from './LocationInfo';
import turfBbox from '@turf/bbox';
import {
  featureCollection as turfFeatureCollection,
  point as turfPoint,
} from '@turf/helpers';
import geoViewport from '@mapbox/geo-viewport';

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: ' 70vh',
    padding: '0.5rem',
    margin: '1rem',
  },
  subMapDiv: {
    width: '100%',
    height: '100%',
  },
});

function NewMap() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [overlay, setOverlay] = useState([]);
  const [defCenter, setDefCenter] = useState([22.5745, 88.4338]);
  const [defZoom, setDefZoom] = useState(18);

  const centerZoomFromLocations = (width = 564, height = 300) => {
    const points = users.map((location) =>
      turfPoint([location.lng, location.lat])
    );
    const features = turfFeatureCollection(points);
    const bounds = turfBbox(features);

    const { center, zoom } = geoViewport.viewport(bounds, [width, height]);

    return {
      center: [center[1], center[0]],
      zoom: Math.max(zoom, 5),
    };
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    let tmp = [];
    users.map((i) => tmp.push(false));
    setOverlay(tmp);
  }, [users]);

  const getAllUsers = async () => {
    try {
      let response = await getUsers();
      if (response.data) {
        let tmp = [];
        response.data.map((i) => {
          let obj = {
            name: i.name,
            lng: i.lng,
            lat: i.lat,
          };
          tmp.push(obj);
        });
        tmp.push({
          lat: 30.139889,
          lng: 77.288433,
        });
        setUsers(tmp);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(defZoom);
  return (
    <Card className={classes.root}>
      <div className={classes.subMapDiv}>
        {users.length > 0 ? (
          <Map
            minZoom={5}
            defaultCenter={
              centerZoomFromLocations().center
                ? centerZoomFromLocations().center
                : [22.5745, 88.4338]
            }
            defaultZoom={
              centerZoomFromLocations().zoom
                ? centerZoomFromLocations().zoom
                : 5
            }
          >
            <ZoomControl />
            {users.length > 0 &&
              users.map((i, index) => (
                <Marker
                  color="#22577A"
                  key={index}
                  width={30}
                  anchor={[parseFloat(i.lat), parseFloat(i.lng)]}
                  // onClick={() => setDetails(index)}
                />
              ))}
            {/* <Overlay
              anchor={
                users.length > 0
                  ? [users[1].lat, users[1].lng]
                  : [22.5745, 88.4338]
              }
            >
              <Card>I am here</Card>
            </Overlay> */}
          </Map>
        ) : (
          'Nothing to Show'
        )}
      </div>
    </Card>
  );
}

export default NewMap;
