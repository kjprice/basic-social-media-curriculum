import React, { Component } from "react";

import {
  Switch,
  Route
} from "react-router-dom";

import socketIOClient from "socket.io-client";
import Messages from './Misc/Messages';
import Signin from './Misc/Signin';
import Header from './Header';


import { sendMessage } from '../controllers/messages';

import { signUp, signIn, logout, getLoggedInUser } from '../controllers/users';
const defaultState = {
  response: false,
  user: null,
  authenticated: false,
  // TODO: Change endpoint (run serverside socket.io)
  endpoint: "http://localhost:4001"
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
    this.getLoggedInUser();
  }

  getLoggedInUser = () => {
    getLoggedInUser()
    .then((response) => {
      const {user} = response.data;
      console.log(response)
      if (user && user.username) {
        this.setState({
          authenticated: true,
          user: user,
        })
      }
    });
  }

  sendMessage = (message) => {
    // TODO: Display success message when message is sent
    sendMessage(message)
  }

  signUp = (username, password) => {
    signUp(username, password)
    .then(() => {
      this.getLoggedInUser();
    })
    .catch((e) => {
      const { errorMessage } = e.response.data;
      this.setState({ signInError: errorMessage });
    });
  }

  signIn = (username, password) => {
    signIn(username, password)
    .then(() => {
      // TODO: Get user messages, contacts, wall
      this.setState({
        authenticated: true
      });
    });
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
    const { messages } = this.state;
    return (
      <Switch>
        <Route path="/Messages">
            <Messages messages={messages} sendMessage={this.sendMessage} />
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
