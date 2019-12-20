import React from 'react';
import {Link} from 'react-router-dom';

import style from './Button.module.css'

const Button = (props) => {

    let inputElement = null;
    let styles = style.Button
    
    if(props.bgcolor){
        styles = [style.Button, style.BgDark].join(' ');
    }

    switch(props.type){
        case('button'):
            inputElement = (<button 
                className={styles} 
                {...props}
                >{props.children}</button>)
        break;
        case('link'):
            inputElement = (
                <Link
                    className={styles}
                    {...props}
                    >{props.children}</Link>)
        break;
        default:
            inputElement = (<button className={styles} {...props}>{props.children}</button>)
    }
    
    return(
        inputElement
    )
}

export default Button;