import React from 'react';
import { makeStyles, Card } from '@material-ui/core';
import NewMap from './NewMap';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: ' 90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeView() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NewMap />
    </div>
  );
}

export default HomeView;
