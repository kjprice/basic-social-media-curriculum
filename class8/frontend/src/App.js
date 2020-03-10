import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const defaultState = {
  messages: [],
};


function getMessagesFromServer() {
  return axios.get('http://localhost:3113/messages');
}

function Message(props) {
  return (<li>{props.message.body}</li>);
}

function Messages(props) {
  console.log(props);
  return (
  <ul>
    {props.messages.map(message => <Message key={message.id} message={message} />)}
  </ul>);
}

class App extends Component {
  state = defaultState;

  componentWillMount() {
    return getMessagesFromServer()
    .then(res => {
      this.setState({
        messages: res.data
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        <Messages messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
