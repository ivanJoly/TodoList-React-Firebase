import React, { Component } from 'react';

import Task from '../../components/UI/Task/Task';
import Loading from '../UI/Loading/Loading';

class AllTask extends Component{ 
    render(){
        let timeAnimation = 100;
        let showTasks = <Loading/>
        if(this.props.tasks.length !== 0){
        showTasks = this.props.tasks.map(task => {
            timeAnimation = timeAnimation + 100
            return (
            <Task 
                key={task.id}
                timeAnimation={timeAnimation}
                useruid={this.props.useruid}
                {...task}
                />
                )
            })
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

export default AllTask;