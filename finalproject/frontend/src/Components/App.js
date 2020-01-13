import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import socketIOClient from "socket.io-client";
import Messages from './Misc/Messages';
import Header from './Header';


import { sendMessage } from '../controllers/messages';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      // TODO: Change endpoint (run serverside socket.io)
      endpoint: "http://localhost:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("messages", (messages) => this.setState({ messages }));
  }

  sendMessage = (message) => {
    // TODO: Display success message when message is sent
    sendMessage(message)
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={{textAlign: 'center'}}>
        <Header />
        <Switch>
          <Route path="/Messages">
            <Messages messages={messages} sendMessage={this.sendMessage} />

        </Route>
      </Switch>
      </div>
    );
  }
}
