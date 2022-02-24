import react, { useState } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../Service/api';
import EditDetailModal from './EditDetailModal';

const useStyles = makeStyles({
  root: {
    width: '240px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: '0.4s all',
    borderRadius: '7px',
    padding: '10px 20px 20px',
    backgroundColor: 'white ',
    height: '130px',
    margin: '1rem',
    '&:hover': {
      boxShadow: '1px 3px 5px 2px rgba(0, 0, 0, 0.11)',
      transform: 'translateY(-5px)',
    },
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  name: {
    margin: '0px',
    fontFamily: 'Sora',
    fontWeight: '700',
    fontSize: '22px',
  },
  phone: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: '17px',
    color: '#424642',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  longlat: {
    fontFamily: 'Sora',
    fontWeight: '600',
    fontSize: '17px',
    color: '#424642',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function UserCard({ id, name, lat, lng, phone, setUsers, category }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const classes = useStyles();
  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };
  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.name} align="center" variant="h4">
        {name}
      </Typography>
      <div className={classes.flex}>
        <Button
          color="primary"
          variant="contained"
          // component={Link}
          onClick={() => setShowEditModal(true)}
          // to={`/edit/${id}`}
        >
          Edit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => deleteUserData(id)}
        >
          Delete
        </Button>
      </div>
      <EditDetailModal
        show={showEditModal}
        setShow={setShowEditModal}
        setUsers={setUsers}
        userid={id}
        user={{
          name: name,
          lat: lat,
          lng: lng,
          phone: phone,
          category: category,
        }}
      />
    </div>
  );
}

export default UserCard;
