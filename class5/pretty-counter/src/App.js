import React from 'react';
import './App.css';
import PageHeader from './PageHeader';
import LoginForm from './LoginForm';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      name: 'Bob'
    }; 
  }

  handleCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    return(
      <div>
        <PageHeader count={this.state.count} name={this.state.name} />
        <LoginForm type="button" onClick={this.handleCount} />
        <div>
          What's your name? <input type="text" onChange={this.handleNameChange} value={this.state.name} />
        </div>
      </div>
    )
  }
}


export default App;
