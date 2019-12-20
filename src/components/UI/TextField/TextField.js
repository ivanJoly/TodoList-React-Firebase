import React from 'react';

import style from './TextField.module.css'

const TextField = (props) => {
    return(
            <div className={style.group}>      
                <input 
                    type={props.type} 
                    value={props.value}
                    onChange={(e) => props.change(props.statePropName, e)}
                    required 
                />
                <span className={style.highlight}></span>
                <span className={style.bar}></span>
                <label>{props.label}</label>
            </div>
    )
}

export default TextField