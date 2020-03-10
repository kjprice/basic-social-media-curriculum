/**
 * TODO:
 *  - Messages should be assumed to be a list from a particular user (another contact)
 *  - We need to assume a user is passed in too
 */
import React, {Component} from "react";
import {
    Link
  } from "react-router-dom";

// import Message from './Message';
// import SendMessage from './SendMessage';

export default class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderFriend = (friend) => {
        const {_id, fullname, username} = friend;
        return (
            <div key={_id} className="col-sm-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{username} </h5>
                    <p className="card-text">{fullname} </p>
                    <Link to={`/Messages/${_id}`} className="btn btn-primary">Messages</Link>
                </div>
                </div>
            </div>
        );
    }

    renderFriends = () => {
        const { friends } = this.props;

        if (!friends || ! friends.length) {
            return ('It appears you do not have any contacts yet, you can add some below');
        }
        return (
            <div className="row">
                {friends.map((friend) => this.renderFriend(friend))}
            </div>
        );
    }

    renderUser = (user) => {
        const { addFriend } = this.props;
        const {_id, fullname, username} = user;

        return (
            <div key={_id} className="col-sm-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{username} </h5>
                    <p className="card-text">{fullname} </p>
                    <button type="button" href="#" className="btn btn-primary" onClick={() => addFriend(_id)}>Add as a friend</button>
                </div>
                </div>
            </div>
        );
    }

    renderUsers = () => {
        const { users } = this.props;

        if (!users || ! users.length) {
            return ('No users registered yet, come back later though!');
        }

        return (
            <div className="row">
                {users.map((user) => this.renderUser(user))}
            </div>
        );
    }

    render() {
        const { friends, users } = this.props;
        if (!(friends || []).length && !(users || []).length) {
            // TODO: Add a spinner here
            return null;
        }

        return (
            <div>
                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Friends</h1>
                </div>
                {this.renderFriends()}
                {this.renderUsers()}

                {/* <SendMessage  sendMessage={sendMessage} />
                {messages.map((message) => {
                    return (
                    <Message
                        message={message}
                        key={message._id}
                    />
                    )
                })} */}
            </div>
        );
    }
}