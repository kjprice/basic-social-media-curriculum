import React from "react";
import {
    Link
  } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Andrews Social Messaging</h5>
            <nav className="my-2 my-md-0 mr-md-3">
            <Link to="/MyFeed" className="p-2 text-dark">My Feed</Link>
            <Link to="/Messages" className="p-2 text-dark">Messages</Link>
                
            </nav>
            <a className="btn btn-outline-primary" href="#">Sign up</a>
        </div>
    )
}
