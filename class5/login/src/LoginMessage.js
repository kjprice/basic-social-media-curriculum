import React from 'react';

export default function LoginMessage(props) {
    if (props.errorMessage) {
        return (<b>{props.errorMessage}</b>);
    }

    return null;
}