import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Logo from '../../UI/Logo/Logo';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm'; 

import styles from './Login.module.css';

class Login extends Component{
    state = {
        mail: '',
        password: '',
        name: ''
    }

    handleChange  = (name, e) => {
        this.setState({[name]: e.target.value})
    }

    render(){
        const loginHome = (
            <div className={styles.ContainerLogin}>
                <div className={styles.Img}>
                    <Logo/>
                </div>
                <div className={styles.Buttons}>    
                    <Button
                    type="link"
                    to='/signin'
                    exact="true"
                    margin="10px">Sign In</Button>
                    <Button
                    style={{margin:'10px 0'}}
                    type="link"
                    to='/signup'
                    exact="true">Sign Up</Button>
                    <Button
                    type="button"
                    onClick={this.props.signinwithgoogle}>With Google</Button>
                </div>
            </div>
        )

        const signInFormComponent = (
            <div className={styles.ContainerLogin}>
                <div className={styles.Img}>
                    <Logo/>
                </div>
                <div className={styles.Buttons}>
                    <SignInForm
                        mail={this.state.mail}
                        password={this.state.password}
                        change={this.handleChange}
                        signin={this.props.signin}
                    ></SignInForm>
                </div>
            </div>
        )

        const signUpFormComponent = (
            <div className={styles.ContainerLogin}>
                <div className={styles.Img}>
                    <Logo/>
                </div>
                <div className={styles.Buttons}>
                    <SignUpForm
                        mail={this.state.mail}
                        password={this.state.password}
                        name={this.state.name}
                        change={this.handleChange}
                        signup={this.props.signup}
                    ></SignUpForm>
                </div> 
            </div>
        )
        return(
            <Fragment>
                <Switch>
                    <Route path='/' exact render={() => loginHome}/>
                    <Route path='/signin' exact render={() => signInFormComponent}/>
                    <Route path='/signup' exact render={() => signUpFormComponent}/>
                </Switch>
            </Fragment>
        )
    }
}

export default Login;