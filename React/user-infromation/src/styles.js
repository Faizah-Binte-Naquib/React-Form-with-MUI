import {makeStyles}  from '@material-ui/core/styles'
import { margin } from '@mui/system';

const useStyles = makeStyles((theme)=>({
container:{
    marginTop:'50px',

},
paper:{
    margin:theme.spacing(5),
    padding:theme.spacing(3)
},
body:{
   
},
item:{
    margin:'10px',
    width: '300px'
},
button:{
    margin:'10px',
    marginLeft:'150px'
}
}))

export default useStyles;