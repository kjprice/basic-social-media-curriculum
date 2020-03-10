/* TODO:
* Copy over Homework3 into a new folder called "homework4" (Using the Finder) and make sure that it runs. 
*  - There are sometimes issues with node_modules being copied over
* Create a new component (within its file) called "SignUp"
* The SignUp component is stateless. Initially it will be identical to the LoginForm component (you can just copy that LoginForm and rename the copied component to "SignUp")
* The SignUp Component needs to have an h3 tag with text "Sign Up"
* In addition to the username and password fields, we want to add an additional field called "favoritePastry"
* The input "favoritePastry" should have the text "Favorite Pastry" and a callback called "onFavoritePastryChanged" (which will be defined in the parent component). It should also be type="text" (not a password)

* Create a button within the App component that will show the "Sign Up" or "Login" componenet based on what is pressed, put this near the top of your App's render function...
* The button should be `type="button"` (so that it does not submit the form if you have one)
* Set a default state property "credentialsScreen" to the value "login" (within the constructor method of your App component)
* Create a function, within your App class, called "changeCredentialsScreen" which will check what the current state value of "credentialsScreen" is. If the current value of credentialsScreen is "login" then it will set the state value of "credentialsScreen" to "signup" and visa versa.
* With the newly created button, add a prop called "onClick" which will reference the function "changeCredentialsScreen"
* Create a variable, within your render function, called "buttonText" which will want to show the opposite of what is set in the "credentialsScreen" state variable.
* - So, if the current value of `credentialsScreen` is "login", then we want to show "Sign Up"

* Create a function called `renderSignIn` that will return the "LoginComponent" if the current "credentialsScreen" state is set to "login", otherwise return the "SignUp" component
* Within your App component, replace the block that currently returns the <Login /> component with the code "{this.renderSignIn()}"

* Within the App componenet, define the callback function onFavoritePastryChanged, which will set the state property "favoritePastry". Have this state property defaulted to the value of an empty string.
* Pass "onFavoritePastryChanged" to the SignUp component using props. Tie this event down to the underlying "favorite pastry" text box

* Create a new state property called "users", default it to an empty array
* Within the onSubmit function, check if the "credentialsScreen" is set to "signup", and, if so, let's add the users' information to the state property called "users"
* - We should be setting the new "user" as an object such as users= [{username:'', password:'', favoritePastry:''}]
* - Be sure to use an Immutable operation to set the new user (hint, do not use push)...What I like to do for setting new arrays is something like:
* - this.setState({users: users.concat(newUser)})... (where `newUser` is an object we created containing all the information for the user)
* When the user signs up, we also want to immediately log them in

* Within the onSubmit function, check if the "credentialsScreen" is set to "login" also, and, if so, let's see if the provided `username` and `password` are found in this.state.users
* You can use the Array.find method to do this as described here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find. Not that you need to pass a function into the `find` method
* We want to verify that the "username" and "password" match previously signed up users
* If the user is found, set the state property "favoritePastry" to the found users' "favoritePastry"

* Within the UserContent component, pass down (from App state) the property "favoritePastry" as a prop. Within the UserContent component also display the text `Your favorite Pastry is {favoritePastry}`

* Whenever you refresh the page, the signed-up users does not persist. We want to know the previous users at all times. To do this, we need to read from `localStorage`...
* Within the onSubmit function, if the user is "signing up", we want to store all users (and the new user) into `localStorage`. I sugguest creating a new array called "allUsers" with the value `users.concat(newUser)`. Pass `allUsers` into state (as the "users" state property) and also set this within `localStorage` but first you must turn `allUsers` into a string.
* Set this to localStorage as `localStorage.allUsers`
* Within your constructor method, first check to see if `localStorage.allUsers` has a value, if it does, set the "parsed" string to the "users" default state. If the "localStorage.allUsers" does not exist, then set the state "users" to an empty array


* 
*/
import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import UserContent from './UserContent';
import LoginMessage from './LoginMessage';
import SignUp from './SignUp';

class App extends React.Component {
  constructor() {
    super();

    let users;
    if (localStorage.users) {
      users = JSON.parse(localStorage.users);
    } else {
      users = [];
    }

    const username = localStorage.username || '';
    const favoritePastry = localStorage.favoritePastry || '';
    const loginSuccess = localStorage.loginSuccess || false;

    this.state = {
      username,
      password: '',
      loginSuccess,
      errorMessage: '',
      credentialsScreen: 'login',
      favoritePastry,
      users,
    };
   }

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

  onLoginSuccess = (user) => {
    const { username, favoritePastry } = user;
    localStorage.username = username;
    localStorage.favoritePastry = favoritePastry;
    localStorage.loginSuccess = true;
  };

  changeCredentialsScreen = () => {
    const { credentialsScreen } = this.state;

    if (credentialsScreen === 'login') {
      this.setState({
        credentialsScreen: 'signup'
      });
    } else {
      this.setState({
        credentialsScreen: 'login'
      });
    }
  };

  onFavoritePastryChanged = (e) => {
    this.setState({
      favoritePastry: e.target.value,
    })

  };

  onSubmit = () => {
    const { username, password, users, favoritePastry, credentialsScreen } = this.state;

    if (credentialsScreen === 'signup') {
      const allUsers = users.concat({username, password, favoritePastry});
      localStorage.users = JSON.stringify(allUsers);
      this.setState({
        loginSuccess: true,
        users: allUsers,
      });

      this.onLoginSuccess({username, favoritePastry});

      return;
    }

    // This is for login
    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      this.setState({
        loginSuccess: true,
        errorMessage: '',
        favoritePastry: foundUser.favoritePastry,
      });

      this.onLoginSuccess({username, favoritePastry});
    } else {
      this.setState({
        loginSuccess: false,
        errorMessage: 'Incorrect Username or password'
      })
    }
  }

  renderSignIn = () => {
    const { credentialsScreen } = this.state;
    if (credentialsScreen === 'login') {
      return (<LoginForm onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit} />);
    }

    return (<SignUp onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit} onFavoritePastryChanged={this.onFavoritePastryChanged} />);
  };

  logout = () => {
    this.setState({
      loginSuccess: false,
    });

    delete localStorage.loginSuccess;
  }

  render() {
    const { loginSuccess, username, errorMessage, credentialsScreen, favoritePastry } = this.state;
    
    const buttonText = credentialsScreen === 'login' ? 'SignUp' : 'Login';

    if (loginSuccess) {
      return (<UserContent username={username} logout={this.logout} favoritePastry={favoritePastry} />)
    }

    return (
      <div>
        <button type="button" onClick={this.changeCredentialsScreen} >{buttonText}</button>
        {this.renderSignIn()}
        <div><LoginMessage errorMessage={errorMessage} /></div>
      </div>
    );
  }
}

export default App;
