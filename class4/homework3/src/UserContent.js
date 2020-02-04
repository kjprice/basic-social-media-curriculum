import React from 'react';

export default function UserContent(props) {
    return (
        <div>
            <div><b>Welcome {props.username}</b></div>
            <div><button type="text" onClick={props.logout}>Logout</button></div>
        </div>
    )
}