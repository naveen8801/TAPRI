import React, { useState, useEffect, Fragment } from 'react';
import { Map, Marker, ZoomControl, Overlay } from 'pigeon-maps';
import { makeStyles, Card, Typography } from '@material-ui/core';
import FoodStallsMarker from './FoodStallsMarker';
import { getUsers } from '../Service/api';
import TeaStallsMarker from './TeaStallMarker';
import GroceryShopsMarker from './GroceryShopMarker';
import LocationInfo from './LocationInfo';
import turfBbox from '@turf/bbox';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {
  featureCollection as turfFeatureCollection,
  point as turfPoint,
} from '@turf/helpers';
import geoViewport from '@mapbox/geo-viewport';
import { Link } from 'react-router-dom';

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
  overlayCard: {
    padding: '1rem',
    minWidth: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  overlaySubDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dirText: {
    fontSize: '13px',
    color: 'blue',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  markerOverlay: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function NewMap() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [overlay, setOverlay] = useState({ show: false, lat: 0.0, lng: 0.0 });
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
            category: i.category,
          };
          tmp.push(obj);
        });
        setUsers(tmp);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkerClick = (i) => {
    let tmp = {
      show: true,
      lat: i.lat,
      lng: i.lng,
      name: i.name,
    };
    console.log('in');
    setOverlay(tmp);
  };

  const generateDirectionLink = (lat, lng) => {
    return `http://maps.google.com/maps?q=${lat},${lng}`;
  };

  const returnMarkerImage = (i) => {
    if (i.category === 'TEA' || i.category === 'FOOD') {
      return <FoodStallsMarker />;
    } else if (i.category === 'GROCERY') {
      return <GroceryShopsMarker />;
    }
  };

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
                <Overlay
                  className={classes.markerOverlay}
                  key={index}
                  anchor={[parseFloat(i.lat), parseFloat(i.lng)]}
                >
                  <div onClick={() => handleMarkerClick(i)}>
                    {returnMarkerImage(i)}
                  </div>
                </Overlay>
              ))}
            {overlay.show ? (
              <Overlay
                offset={[100, -29]}
                anchor={[parseFloat(overlay.lat), parseFloat(overlay.lng)]}
              >
                <Card className={classes.overlayCard}>
                  <Typography style={{ fontSize: '17px' }} variant="h6">
                    {overlay.name ? overlay.name : 'Unnamed'}
                  </Typography>
                  <div className={classes.overlaySubDiv}>
                    <LocationOnIcon fontSize="17px" />
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={{
                        pathname: generateDirectionLink(
                          overlay.lat,
                          overlay.lng
                        ),
                      }}
                      target="_blank"
                    >
                      <Typography className={classes.dirText} variant="h6">
                        View Directions
                      </Typography>
                    </Link>
                  </div>
                </Card>
              </Overlay>
            ) : null}
          </Map>
        ) : (
          'Nothing to Show'
        )}
      </div>
    </Card>
  );
}

export default NewMap;
