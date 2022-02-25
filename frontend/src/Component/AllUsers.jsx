import { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  makeStyles,
  Grid,
  Container,
} from '@material-ui/core';
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: '1rem',
    flexWrap: 'wrap',
    padding: '1rem',
    justifyContent: 'center',
  },
});

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllUsers();
  }, []);

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
      {users.map((item) => (
        <UserCard
          id={item._id}
          name={item.name}
          lat={item.lat}
          lng={item.lng}
          phone={item.phone}
          setUsers={setUsers}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default AllUsers;
