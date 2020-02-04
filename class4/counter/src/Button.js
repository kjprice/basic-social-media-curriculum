import React from 'react';

export default function Button (props) {
    return (<button type={props.type} onClick={props.onClick}>
        Count Up!!
    </button>
    );
}