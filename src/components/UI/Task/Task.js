import React, { Component } from 'react';

import styles from './Task.module.css';
import MdTrash from 'react-ionicons/lib/MdTrash'
import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import MdClose from 'react-ionicons/lib/MdClose'


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import 'firebase/database';

class Task extends Component{

    state={
        active: false,
        disabled: false,
        checked: false,
        removeCheck: false
    }

    componentDidMount(){
        this.activeHandler();
        if(this.props.state === 'done'){
            this.setState({checked: true});
        }else{
            this.setState({checked: false});
        }
    }

    activeHandler = async () => {
        let timeoutId;
        let extraTime = this.props.timeAnimation + 200
        await {then: resolve => timeoutId = setTimeout(resolve, extraTime)}
        this.setState({active: !this.state.active})
        clearInterval(timeoutId);
        return 'Done'
    }

    changeCheck = (id, state,  e) => {
        var db = firebase.database();
        this.setState({disabled: !this.state.disabled});
        let lastState = ''
        let newState = ''
        let newStateFB = '';
        let taskId = id;

        if(state === 'done'){
            newState = false;
            lastState = true;
            newStateFB = 'undone';
        }else{
            newState = true;
            lastState = false;
            newStateFB = 'done';
        }

        db.ref("/users/"+ this.props.useruid +"/tasks/"+ taskId).update({ state: newStateFB}, (error) => {
            if (error){
                console.log('error');
                this.setState({checked: lastState});
                this.setState({disabled: !this.state.disabled});
            }else{
                this.setState({checked: newState});
                this.setState({disabled: !this.state.disabled});
            }
        });
    }

    removeStateTask = (id, e) => {
        
        this.setState({removeCheck: !this.state.removeCheck})
    }

    removeTask = (id, e) => {
        var db = firebase.database();
        let taskId = id;
        db.ref("/users/"+ this.props.useruid +"/tasks/"+ taskId).remove((error) => {
            if (error){
                console.log('error');
            }else{
                console.log('se removio satisfactoriamente!');
            }
        });
    }

    render(){
        let activeChange = [styles.Task, styles.Out];
        let checkStyle = null;
        let removeStyle = [styles.RemoveAsk, styles.RemoveOut]
        let removeIcon = {}

        if(this.state.active){
            activeChange = [styles.Task, styles.Out, styles.In]
        }

        if(this.props.state === 'done'){
            checkStyle = {borderLeft: '2px solid green'}
        }else{
            checkStyle = {borderLeft: '2px solid red'}
        }

        if(this.state.removeCheck){
            removeStyle = [styles.RemoveAsk, styles.RemoveOut, styles.RemoveIn]
            removeIcon = {marginRight:'30px'}
        }

        return(
            <div className={styles.TaskContainer}>
                <div className={activeChange.join(' ')} style={checkStyle}>
                    <div className={styles.Check}>
                        <input 
                        type="checkbox" 
                        name="check" 
                        id="Check" 
                        checked={this.state.checked}
                        onChange={(e) => this.changeCheck(this.props.id, this.props.state, e)}
                        disabled={this.state.disabled}/>
                    </div>
                    <div className={styles.Data}>
                        <h2 className={styles.Title}>{this.props.title}</h2>
                        <h3 className={styles.Description}>{this.props.description}</h3>
                    </div>
                    <div className={styles.Remove}>
                        <MdTrash style={removeIcon} onClick={(e) => {this.removeStateTask(this.props.id, e)}}/>
                    </div>
                </div>
                <div className={removeStyle.join(' ')}>
                    <div className={styles.CheckAsk} onClick={(e) => {this.removeTask(this.props.id, e)}}>
                        <MdCheckmark color="#4caf50"/>
                    </div>
                    <div className={styles.CloseAsk} onClick={(e) => {this.removeStateTask(this.props.id, e)}}>
                        <MdClose color="#ea3123"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;