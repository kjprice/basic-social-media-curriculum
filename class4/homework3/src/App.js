import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import UserContent from './UserContent';
import LoginMessage from './LoginMessage';

class App extends React.Component {
  state = {
    username: '',
    password: '',
    loginSuccess: false,
    errorMessage: ''
  };

  onUsernameChanged = (event) => {
    console.log(event.target.value)
    this.setState({
      username: event.target.value,
    })
  };

  onPasswordChanged = (event) => {
    this.setState({
      password: event.target.value,
    })
  };

  onSubmit = () => {
    const { username, password } = this.state;

    if ( username === 'bob' && password === 'dragon') {
      this.setState({
        loginSuccess: true,
        errorMessage: '',
      });
    } else {
      this.setState({
        loginSuccess: false,
        errorMessage: 'Incorrect Username or password'
      })
    }
    console.log(this.state);
  }

  logout = () => {
    this.setState({
      loginSuccess: false,
    });
  }

  render() {
    const { loginSuccess, username, errorMessage } = this.state;    

    if (loginSuccess) {
      return (<UserContent username={username} logout={this.logout} />)
    }

    return (
      <div>
        <LoginForm onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit} />
        <div><LoginMessage errorMessage={errorMessage} /></div>
      </div>
    );
  }
}

export default App;
