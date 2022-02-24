import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Modal,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  heading: {
    marginTop: '1rem',
    fontFamily: 'Sora',
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});

function EditDetailModal({ user, show, setShow, setUsers, userid }) {
  const classes = useStyles();
  const [initData, setInitData] = useState(
    user ? user : { name: '', lat: '', lng: '', phone: '', category: '' }
  );
  const [alert, setAlert] = useState({ show: false, text: '' });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setInitData(user);
  }, [user]);

  const onValueChange = (k, v) => {
    let curr = { ...initData };
    curr[k] = v;
    setInitData(curr);
  };

  const submitHandler = async () => {
    if (
      initData.name === '' ||
      initData.lat === '' ||
      initData.lng === '' ||
      initData.phone === '' ||
      initData.category === ''
    ) {
      setAlert({ show: true, text: 'Input fields can not be empty' });
      return;
    }
    setAlert({ show: false, text: '' });
    try {
      setloading(true);
      const res = await editUser(userid, initData);
      let response = await getUsers();
      setUsers(response.data);
      setShow(false);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Typography className={classes.heading} align="center" variant="h5">
        Edit Details
      </Typography>
      <DialogContent>
        {alert.show ? <Alert severity="error">{alert.text}</Alert> : null}
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            label="Name"
            onChange={(e) => onValueChange(e.target.name, e.target.value)}
            name="name"
            value={initData.name}
            id="my-input"
          />
          <TextField
            variant="outlined"
            label="Lat"
            margin="normal"
            onChange={(e) => onValueChange(e.target.name, e.target.value)}
            name="lat"
            value={initData.lat}
            id="my-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Long"
            onChange={(e) => onValueChange(e.target.name, e.target.value)}
            name="lng"
            value={initData.lng}
            id="my-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Phone"
            onChange={(e) => onValueChange(e.target.name, e.target.value)}
            name="phone"
            value={initData.phone}
            id="my-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Category"
            onChange={(e) => onValueChange(e.target.name, e.target.value)}
            name="category"
            value={initData.category}
            id="my-input"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          variant="contained"
          onClick={() => submitHandler()}
          color="primary"
        >
          Submit
        </Button>
        <Button
          disabled={loading}
          onClick={() => setShow(false)}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDetailModal;
