import React from 'react'
import Form from './FormInput'
import {Paper} from '@material-ui/core'
import useStyles from '../styles'
export default function FormValid() {
    const classes = useStyles()
    return (
        <div>
            <Paper className={classes.paper}>
                <Form/>
            </Paper>
        </div>
    )
}
