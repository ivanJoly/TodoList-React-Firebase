import React, { Component, Fragment } from 'react';
import { Switch, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import date from 'date-and-time';
import IosList from 'react-ionicons/lib/IosList'
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline'
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline'

import Header from './Header/Header';
import AllTask from '../AllTask/AllTaks';
import DoneTask from '../DoneTask/DoneTask';
import UndoneTask from '../UndoneTask/UndoneTask';
import Button from '../UI/Button/Button';
import OpacityScreen from '../UI/OpacityScreen/OpacityScreen';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import 'firebase/database';

import ModalTask from '../UI/ModaAddlTask/ModalAddTask';
import styles from './Home.module.css';

let taskEvent
class Home extends Component {

    state = {
        user: this.props.user,
        tasks: [],
        withOutTasks: false,
        modalTaskState: false,
        showOpScreen: false,
        actualPage: ''
    }


    componentDidMount(){
        console.log('--ComponentDidMount--');
        this.obtainPath();
        this.updateEvent()
    }

    obtainPath = (pathDefined = null) => {
        let path = this.props.location.pathname;
        let pathFinal = ''
        console.log(pathDefined);
        if(!pathDefined){
            switch(path){
                case '/':
                    pathFinal = 'All Tasks';
                break
    
                case '/done':
                    pathFinal = 'Done Tasks';
                break
    
                case '/undone':
                    pathFinal = 'Undone Tasks';
                break
    
                default:
                    pathFinal = '';
                break
    
            }
        }else{
            pathFinal = pathDefined;
        }

        this.setState({actualPage: pathFinal})
    }

    updateEvent = () => {
        let userId = this.props.user.uid;
        taskEvent = firebase.database().ref('/users/' + userId + '/tasks/');
        taskEvent.on('value', snapshot => {
            this.updateTasks(snapshot.val())
        });
    }

    updateTasks = (data) => {
        let arr = []
        if(data){
            Object.keys(data).map(function(key) {
                return arr.push({id:key, ...data[key]})
            });
            this.setState({withOutTasks: false});
        }
        if(!data){
            this.setState({withOutTasks: true});
        }
        this.setState({tasks:arr})
    }

    handleModalTaskState = () => {
        this.setState({modalTaskState: !this.state.modalTaskState, showOpScreen: !this.state.showOpScreen})
    }

    sendTask = (title, description) => {
        const now = new Date();
        const time = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        const database = firebase.database();
        database.ref('users/' + this.props.user.uid + '/tasks/').push({
            title,
            description,
            time,
            state:'undone'
          })
          .then(data => {
                this.handleModalTaskState();
          })
          .catch(error => {
              console.log(error);
          })
    }

    render(){

        const buttonStyle = {
            height:'100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        const buttonStyleCenter = {
            height:'100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: '1px solid white',
            borderLeft: '1px solid white'
        }

        return(
            <Fragment>
                <div className={styles.HomeContainer}>
                    <Header logout={this.props.logout}/>
                    <div className={styles.MainContainer}>
                        <div className={styles.PageTitle}>
                            <h2>{this.state.actualPage}</h2>
                        </div>
                        <div className={styles.Main}>
                            <Switch>
                                <Route 
                                path="/" 
                                exact 
                                render={() => <AllTask tasks={this.state.tasks} withOutTasks={this.state.withOutTasks} useruid={this.state.user.uid}/>}/>
                                <Route 
                                path="/done" 
                                exact 
                                render={() => <DoneTask tasks={this.state.tasks} withOutTasks={this.state.withOutTasks} useruid={this.state.user.uid}/>}/>
                                <Route 
                                path="/undone" 
                                exact 
                                render={() => <UndoneTask tasks={this.state.tasks} withOutTasks={this.state.withOutTasks} useruid={this.state.user.uid}/>}/>
                            </Switch>
                        </div>
                        <div className={styles.AddTask}>
                            <Button onClick={this.handleModalTaskState}>Add Task</Button>
                        </div>
                    </div>
                    <div className={styles.Footer}>
                        <div className={styles.AllTasks}>
                            <Button
                                style={buttonStyle}
                                type="link"
                                to='/'
                                exact="true"
                                onClick={() => this.obtainPath('All Tasks')}
                                >
                                    <IosList className={styles.Icon}/>
                                </Button>
                        </div>
                        <div className={styles.DoneTasks}>
                            <Button
                                style={buttonStyleCenter}
                                type="link"
                                to='/done'
                                exact="true"
                                onClick={() => this.obtainPath('Done Tasks')}
                                >
                                    <IosCheckmarkCircleOutline className={styles.Icon}/>
                                </Button>
                        </div>
                        <div className={styles.UndoneTasks}>
                            <Button
                                style={buttonStyle}
                                type="link"
                                to='/undone'
                                exact="true"
                                onClick={() => this.obtainPath('Undone Tasks')}
                                >
                                    <IosCloseCircleOutline className={styles.Icon}/>
                                </Button>
                        </div>
                    </div>
                </div>
                <ModalTask 
                modalState={this.state.modalTaskState} 
                changeState={this.handleModalTaskState}
                sendTask={this.sendTask}
                />
                <OpacityScreen show={this.state.showOpScreen}/>
            </Fragment>
        )
    }
}

export default withRouter(Home);