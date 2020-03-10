import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

function createUser(user) {
  return axios.post('http://localhost:4000/user', user);
}

function getMessagesFromServer(user) {
  return axios.get(`http://localhost:3113/messages?userId=${user._id}`);
}


class App extends Component {
  state = {
    username: '',
    password: '',
    user: null,
    messages: []
  };

  onUsernameChanged = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  onPasswordChanged = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  onSubmit = () => {
    const {username, password} = this.state;

    createUser({ username, password }).then((res) => {
      this.setState({
        user: res.data,
      })
      console.log('user created successfully', res.data);
    });
  }

  render() {
    const { user, messages } = this.state;
    if (user) {
      return (
        <div>
          <h1>Welcome {user.username}</h1>
          <ul>
            {messages.map((message) => <li key={message.id}>message.body</li>)}
          </ul>
        </div>
        )
    }
    return (
      <div>
        <div>
          Username: <input type="text" onChange={this.onUsernameChanged} />
        </div>
        <div>
          Password: <input type="password" onChange={this.onPasswordChanged} />
        </div>
        <button onClick={this.onSubmit} type="button">Submit</button>
      </div>
    );
  }
}

export default App;
