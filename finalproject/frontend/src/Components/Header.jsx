import React from "react";
import {
    Link
  } from "react-router-dom";

function renderUserLink(authenticated, logout) {
    if (authenticated) {
        return (<button type="button" onClick={logout} className="btn btn-outline-primary">Log out</button>);
    }

    return (<Link to="/SignIn" className="btn btn-outline-primary">Sign in</Link>);
}

export default function Header(props) {
    const {authenticated, logout} = props;
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Andrews Social Messaging</h5>
            <nav className="my-2 my-md-0 mr-md-3">
            <Link to="/MyFeed" className="p-2 text-dark">My Feed</Link>
            <Link to="/Messages" className="p-2 text-dark">Messages</Link>
            <Link to="/Friends" className="p-2 text-dark">Friends</Link>
                
            </nav>
            {renderUserLink(authenticated, logout)}
        </div>
    )
}
