import React, { Component } from "react";
import socketIOClient from "socket.io-client";

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
    socket.on("messages", ([{body}]) => this.setState({ response: body }));
  }
  render() {
    const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          <div>Hello World</div>
          {response
              ? <p>
                The temperature in Florence is: {response} °F
              </p>
              : <p>Loading...</p>}
        </div>
    );
  }
}
