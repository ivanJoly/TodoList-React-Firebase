import React from 'react';

import styles from './OpacityScreen.module.css';

const OpacityScreen = (props) => {
    return(
        props.show ?
        <div className={styles.OpacityScreen}></div>
        :
        null
    )
}

export default OpacityScreen;