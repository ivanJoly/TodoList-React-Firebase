import React,{ Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login/Login';
import Loading from './components/UI/Loading/Loading';
import ModalErrors from './components/UI/ModalErrors/ModalErrors';

import style from './App.module.css';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import 'firebase/database';
import fireSettings from './config/firebase';

firebase.initializeApp(fireSettings);
const auth = firebase.auth();
const db = firebase.database();

/* Setting full height*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.body.classList.add(style.fullHeight);

class App extends Component {

  state = {
    user: null,
    loading: true,
    error: false,
    errorMessage:''
  }

  componentDidMount(){
    this.authListener();
  }

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user, loading:false});
        this.props.history.push('/');
      } else{
        this.setState({user: null, loading:false})
      }
    });
  }

  signIn = (mail, pass, e) => {

    e.preventDefault();
    let mailAddress = mail;
    let password = pass;
    auth.signInWithEmailAndPassword(mailAddress, password)
    .then((data) => {
      console.log('Ingreso satisfactoriamente!');
    })
    .catch((error) => {
        // console.log(error);
        this.setState({error:true, errorMessage:'Error de conexion'})
    })
  }

  signUp = (name,mail,pass,e) => {
    let mailAddress = mail;
    let password = pass;
    let displayName = name;
    e.preventDefault();
        auth.createUserWithEmailAndPassword(mailAddress, password)
        .then((data) => {

          var user = data.user;
          console.log('Ingreso satisfactoriamente!', user);

          user.updateProfile({
            displayName: displayName
          }).then(function() {

          }, function(error) {
            console.log(error);
          });

          db.ref('users').child(data.user.uid).set({
            'email': mailAddress,
            'displayName': displayName
          })

        })
        .catch((error) => {
            console.log(error);
          this.setState({error:true, errorMessage:'Error de conexion'})
        })
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(function(result) {
      console.log('Ingreso satisfactoriamente!');
      var user = result.user;


      db.ref('/users/' + user.uid).once('value').then(snapshot => {
        let res = snapshot.val();
            if(res === null){
              db.ref('users').child(user.uid).set({
                'email': user.email,
                'displayName': user.displayName,
                'provider': 'Google'
              })
            }
        });

      
    }).catch((error) => {
      console.log(error);
      this.setState({error:true, errorMessage:'Error de conexion'})
    });
  }

  clearErrors = async () => {
      let timeoutId;
      this.setState({error: false})
      await {then: resolve => timeoutId = setTimeout(resolve, 1000)}
      this.setState({errorMessage: ''})
      clearInterval(timeoutId);
      return 'Done'
  }

  logOut = () => {
    auth.signOut()
  }

  render(){
    let main= '';
    if(this.state.user === null && this.state.loading){
      main = (<div className={style.Loading}><Loading/></div>)
    }else if (this.state.user === null && this.state.loading === false){
      main = (<Login
              signin={this.signIn}
              signup={this.signUp}
              signinwithgoogle={this.signInWithGoogle}></Login>)
    }else{
      main = (<Home user={this.state.user} logout={this.logOut}/>)
    }

    return (
        <div className={style.Container}>
          {main}
          {/* <Home user={this.state.user} logout={this.logOut}/> */}
          <ModalErrors error={this.state.error} message={this.state.errorMessage} clear={this.clearErrors}></ModalErrors>
        </div>
    );
  }
}

export default withRouter(App);
