import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Messages from './Misc/Messages';

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
    console.log(this.state);
    const { messages } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          <div>Hello World</div>
          {messages && <Messages messages={messages} sendMessage={this.sendMessage} />}
        </div>
    );
  }
}
