import React, { Fragment } from 'react';

import TextField from '../../UI/TextField/TextField';
import Button from '../../UI/Button/Button';

import styles from '../../../App.module.css';

const SignInForm = (props) => {

    return(
        <Fragment>
            <form className={styles.Form}>
                <TextField
                    label="Mail"
                    statePropName="mail"
                    value={props.mail}
                    type="text"
                    change={props.change}
                />
                <TextField
                    label="Password"
                    statePropName="password"
                    value={props.password}
                    type="password"
                    change={props.change}
                />
                <Button
                onClick={(e) => props.signin(props.mail, props.password, e)}
                >Sign In</Button>
            </form>
        </Fragment>
    )
}

export default SignInForm;