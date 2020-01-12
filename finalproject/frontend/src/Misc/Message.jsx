import React from "react";

export default function Message(props) {
    const {message} = props;
    const {body} = message;
    console.log(props)
    return (
    <div>
        {body}
    </div>
    )
}