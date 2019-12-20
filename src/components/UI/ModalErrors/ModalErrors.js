import React, { Component } from 'react';

import style from './ModalErrors.module.css';

class ModalErrors extends Component {

    state = {
        active: false
    }

    componentDidMount(){
        console.log('Done');
    }

    waitFn = async () => {
        let timeoutId;
        await {then: resolve => timeoutId = setTimeout(resolve, 3000)}
        this.props.clear()
        clearInterval(timeoutId);
        return 'ok'
    }

    render(){
        let stylesChange = [style.ModalErrors, style.out];

        if(this.props.error){
            stylesChange = [style.ModalErrors, style.out, style.in]
            this.waitFn();
        }

        return(
            <div className={stylesChange.join(' ')}>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

export default ModalErrors;