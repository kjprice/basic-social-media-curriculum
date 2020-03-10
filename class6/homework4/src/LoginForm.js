import React from 'react';

export default function LoginForm(props) {
    return (
        <div>
          <h1>Login</h1>
          <div>Username: <input type="text" onChange={props.onUsernameChanged} /></div>
          <div>Password: <input type="password" onChange={props.onPasswordChanged} /></div>
          <button type="button" onClick={props.onSubmit}>Submit</button>
        </div>
    );
}