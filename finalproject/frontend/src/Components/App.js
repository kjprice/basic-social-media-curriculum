import React, { Component } from "react";

import {
  Switch,
  Route
} from "react-router-dom";

import socketIOClient from "socket.io-client";
import Messages from './Misc/Messages';
import Friends from './Misc/Friends';
import Signin from './Misc/Signin';
import Header from './Header';


import { sendMessage } from '../controllers/messages';

import { signUp, signIn, logout, getLoggedInUser, getFriends, getUsers, addFriend } from '../controllers/users';

const defaultState = {
  response: false,
  user: null,
  authenticated: false,
  // TODO: Change endpoint (run serverside socket.io)
  endpoint: "http://localhost:4001",
  contacts: [],
};

export default class App extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("messages", (messages) => this.setState({ messages }));
    this.getAuthenticatedInfo();
  }

  getAuthenticatedInfo = () => {
    return getLoggedInUser()
    .then((response) => {
      const {user} = response.data;
      if (!(user && user.username)) {
        return;
      }

      this.setState({
        authenticated: true,
        user: user,
        friends: user.friends
      });

      return Promise.all([
        // this.getFriends(),
        this.getUsers(),
      ]);
    });
  }

  getUsers = () => {
    return getUsers()
    .then((response) => {
      const { users } = response.data;

      this.setState({
        users,
      })
    })
  }

  getFriends = () => {
    return getFriends()
    .then((response) => {
      const { friends } = response.data;

      this.setState({
        friends,
      })
    })
  }

  sendMessage = (message) => {
    // TODO: Display success message when message is sent
    sendMessage(message)
  }

  signUp = (user) => {
    signUp(user)
    .then(() => {
      this.getAuthenticatedInfo();
    })
    .catch((e) => {
      const { errorMessage } = e.response.data;
      this.setState({ signInError: errorMessage });
    });
  }

  signIn = (email, password) => {
    signIn(email, password)
    .then(() => {
      this.getAuthenticatedInfo();
    });
  }

  addFriend = (userId) => {
    addFriend(userId).then(this.getFriends);
  }

  logout = () => {
    logout().then(() => {
      this.setState(defaultState);
    });
  }

  renderSignIn = () => {
    const { authenticated, signInError } = this.state;
    return (<Signin signUp={this.signUp} signIn={this.signIn} authenticated={authenticated} signInError={signInError} />);
  }

  renderAuthenticatedOptions = () => {
    const { messages, friends, users } = this.state;
    return (
      <Switch>
        <Route path="/Messages">
            <Messages messages={messages} sendMessage={this.sendMessage} />
        </Route>
        <Route path="/Friends">
            <Friends addFriend={this.addFriend} friends={friends} users={users} />
        </Route>
        <Route path="/SignIn">
            {this.renderSignIn()}
        </Route>
      </Switch>
    );
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="container text-center">
        <Header authenticated={authenticated} logout={this.logout} />
        { authenticated ? this.renderAuthenticatedOptions() : this.renderSignIn()}
      </div>
    );
  }
}
