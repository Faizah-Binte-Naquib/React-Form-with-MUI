import React, {useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';

  
  export default function FormTable(props) {


    const [users,setUsers]=useState(null);


    useEffect(()=> {
      Axios.get('http://localhost:8000/user')
      .then(response => {
        setUsers(response.data);
      })
    },[props.response]);


    return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users && users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.mobile}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell align="right">{row.dateofBirth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    );
  }