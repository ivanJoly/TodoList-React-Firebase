import React, { Fragment } from 'react';

import TextField from '../../UI/TextField/TextField';
import Button from '../../UI/Button/Button';

const SignUpForm = (props) => {

    return(
        <Fragment>
            <form>
                <TextField
                    label="Name"
                    statePropName="name"
                    value={props.name}
                    type="text"
                    change={props.change}
                />
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
                onClick={(e) => props.signup(props.name, props.mail, props.password, e)}
                >Sign Up</Button>
            </form>
        </Fragment>
    )
}

export default SignUpForm;