import React from 'react';
import { message } from 'antd';

const ErrorNotification = (props) => {
    return (
       <React.Fragment>
           {
               message.error(props)
           }
       </React.Fragment>
    )
}

const SuccessNotification = (props) => {
    return (
       <React.Fragment>
           {
               message.success(props)
           }
       </React.Fragment>
    )
}

export { ErrorNotification, SuccessNotification }