import React, {useState,useEffect} from 'react'
import {Grid, Radio, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, MenuItem, Select, InputLabel,Button,Paper} from '@material-ui/core'
import useStyles from '../styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import Axios from 'axios';

const initialValues = {
    id:0,
    fullName:'',
    email:'',
    mobile:'',
    country:'',
    gender:'',
    dateofBirth:'',
}

export default function FormInput(props) {
    const classes = useStyles();
    const url=("http://localhost:8000/user");
    const countries = ['Bangladesh','India','Pakistan','Japan','China','Korea'];
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
    
        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
    
        if ("email" in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required."
            if (fieldValues.email)
            temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
                ? ""
                : "Email is not valid."
        }
    
        if ("mobile" in fieldValues)
            temp.mobile =
            fieldValues.mobile ? "" : "This field is required."

        if ("country" in fieldValues)
            temp.country = fieldValues.country ? "" : "This field is required."
    
        setErrors({
            ...temp
        });
        }



    const handleInputChange = (e) => {
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        });
        validate({ [name]: value });
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        var dob = (values.dateofBirth+'').split(" ");

        Axios.post(url,{
            id:values.id,
            fullName:values.fullName,
            email:values.email,
            mobile:values.mobile,
            gender:values.gender,
            country:values.country,
            dateofBirth:dob[1]+' '+dob[2]+' '+dob[3]
        })
        .then(res => {
           props.setResponse(res.data);
        })

    }

    const handleReset = (e) =>{
        setValues({
            fullName:'',
            email:'',
            mobile:'',
            gender:''

        });

       console.log(values);
    }

    console.log(values);
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                    required
                    className={classes.item}
                    variant='outlined' 
                    label='Full Name' 
                    name="fullName"
                    type='text'
                    value={values.fullName}
                    onChange={handleInputChange} onBlur={handleInputChange}
                    {...(errors["fullName"] && { error: true, helperText: errors["fullName"] })}/>
                    <TextField 
                    required
                    className={classes.item}
                    variant='outlined' 
                    label='Email'
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleInputChange} onBlur={handleInputChange}
                    {...(errors["email"] && { error: true, helperText: errors["email"] })}/>
                    <TextField 
                    required
                    className={classes.item}
                    variant='outlined' 
                    label='Mobile'
                    name="mobile"
                    type="phone"
                    value={values.mobile}
                    onChange={handleInputChange} onBlur={handleInputChange}
                    {...(errors["mobile"] && { error: true, helperText: errors["mobile"] })}/>
                    
                </Grid>
                <Grid item xs={6}>
                    <div>
                    <FormControl className={classes.item}>
                        <FormLabel>
                            Gender
                        </FormLabel>
                        <RadioGroup row
                        defaultValue="male"
                        name="gender" 
                        value={values.gender}
                        onChange={handleInputChange}>
                            <FormControlLabel
                            name="gender"
                            value="male"
                            control={<Radio/>}
                            label="Male"
                            onSelect={handleInputChange}/>
                            <FormControlLabel
                            name="gender"
                            value="female"
                            control={<Radio/>}
                            label="Female"
                            onSelect={handleInputChange}/>
                            <FormControlLabel
                            name="gender"
                            value="other"
                            control={<Radio/>}
                            label="Other"
                            onSelect={handleInputChange}/>
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl className={classes.item} fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select name="country" required 
                        onChange={handleInputChange} 
                        onBlur={handleInputChange}
                        {...(errors["country"] && { error: true, helperText: errors["country"] })}
                        >
                            {countries.map(country=>{
                                return   <MenuItem value={country}>{country}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </div>

                    <div> 
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={1} margin='10px' width='300px'>
                        <DatePicker 
                        label="Date of Birth"
                            value={values.dateofBirth}
                            onChange={(newValue) => {   setValues({  
                                ...values,
                                dateofBirth:newValue
                            });
                                }}
                            name="dateofBirth"
                            defaultValue={""}
                            renderInput={(params) => <TextField required {...params} 
                        />}
                        />
                        </Stack>
                        </LocalizationProvider>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Button  variant='contained' color='primary'  className={classes.button} type="submit">Save</Button>
                        <Button  variant='outlined' color='primary' onClick={handleReset}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
        </div>
    )
}







