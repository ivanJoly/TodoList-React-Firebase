import React from 'react';

import style from './TextArea.module.css'

const TextArea = (props) => {
    return(
            <div className={style.group}>      
                <textarea 
                type={props.type} 
                value={props.value}
                onChange={(e) => props.change(props.statePropName, e)}
                required 
                name=""
                id="" 
                cols="30" 
                rows="5"></textarea>
                <span className={style.highlight}></span>
                <span className={style.bar}></span>
                <label>{props.label}</label>
            </div>
    )
}

export default TextArea;