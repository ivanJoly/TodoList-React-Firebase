import React from 'react';

import styles from './Header.module.css';
import Button from '../../UI/Button/Button';

const Header = (props) => {
    return(
        <div className={styles.Header}>
            <div className={styles.TitleContainer}>
                <h2 className={styles.Title}>Welcome to easyList</h2>
            </div>
            <div className={styles.Button}>
                <Button 
                bgcolor="true"
                style={{height:'100%'}}
                onClick={props.logout}>Sign Out</Button>
            </div>
        </div>
    )
}

export default Header;