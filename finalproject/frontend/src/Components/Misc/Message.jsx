import React from "react";

export default function Message(props) {
    const {message} = props;
    const {body} = message;
    return (
    <div>
        {body}
    </div>
    )
}