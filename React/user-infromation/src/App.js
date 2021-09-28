import './App.css';
import FormInput from './components/FormInput'
import {Container} from '@material-ui/core'
import useStyles from './styles'
import {AppBar,Typography,Toolbar, IconButton,Paper} from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu';
import FormTable from './components/FormTable.js'
import React, {useState} from 'react'

function App() {
  const classes = useStyles();


const [response, setResponse] = useState("");

  return (
    <div className={classes.body}>
      <AppBar position="static">
          <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
          Person Infromation
         </Typography>
          </Toolbar>
      </AppBar>
      <Container  className={classes.container}>
      <Paper className={classes.paper}>
            <FormInput response={response} setResponse={setResponse} input/>
      </Paper>
      </Container>
      <br></br>
      <FormTable response={response} setResponse={setResponse}></FormTable>
    </div>
  );
}

export default App;
