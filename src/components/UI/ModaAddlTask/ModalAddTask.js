import React, { Component } from 'react';

import TextField from '../TextField/TextField';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';

import styles from './ModalAddTask.module.css';

class ModalAddTask extends Component{

    state = {
        title:'',
        description: ''
    }

    handleChange  = (name, e) => {
        this.setState({[name]: e.target.value})
    }

    eraseState = async () => {
        let timeoutId;
        await {then: resolve => timeoutId = setTimeout(resolve, 1000)}
        this.setState({title:'', description:''})        
        clearInterval(timeoutId);
    }

    render() {
        let stylesChange = [styles.ModalTask, styles.Out];

        if(this.props.modalState){
            stylesChange = [styles.ModalTask, styles.Out, styles.In];
        }

        return(
            <div className={stylesChange.join(' ')}>
                <TextField
                    label="Title"
                    statePropName="title"
                    value={this.state.title}
                    type="text"
                    change={this.handleChange}
                />
                <TextArea
                    label="Description"
                    statePropName="description"
                    value={this.state.description}
                    type="text"
                    change={this.handleChange}
                />
                <Button onClick={(e) => {this.props.sendTask(this.state.title, this.state.description); this.eraseState();}}>Done</Button>
                <span onClick={this.props.changeState} className={styles.Close}>X</span>
            </div>
        )
    }
}

export default ModalAddTask;