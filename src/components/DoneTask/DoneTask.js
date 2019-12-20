import React, { Component } from 'react';

import Task from '../../components/UI/Task/Task';
import Loading from '../UI/Loading/Loading';

class DoneTask extends Component{
    render(){
        let timeAnimation = 100;
        let showTasks = <Loading/>
        
        if(this.props.tasks.length !== 0){
            console.log('ingreso', this.props.tasks.length);
            let newTasks = this.props.tasks.filter(task => task.state === 'done');
            showTasks = newTasks.map(task => {
                timeAnimation = timeAnimation + 100;
                return(
                    <Task
                        key={task.id}
                        timeAnimation={timeAnimation}
                        useruid={this.props.useruid}
                        {...task}
                    />
                )
            })
            
            if(showTasks.length === 0){
                showTasks = <p>No tiene tareas realizadas.</p>  
            }
        }

        if(this.props.withOutTasks){
            showTasks = <p>No tienes tareas agrega una!</p>
        }
        
        return(
            <div style={{marginBottom: '45px'}}>
                {showTasks}
            </div>
        )
    }
}

export default DoneTask;