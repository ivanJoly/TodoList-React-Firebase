import React from 'react';

import LoadingGif from '../../../assets/img/loading.gif';

const Loading = (props) => {
    return(
        <img src={LoadingGif} alt="Loading" style={{maxWidth: '100%'}} {...props}/>
    )
}

export default Loading;