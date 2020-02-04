/* Must include React */
import React from 'react';

/* How we export in react */
export default function Message (props) {
    return (<div>{props.messageText} {props.lastName}</div>);
}