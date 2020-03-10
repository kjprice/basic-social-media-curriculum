import React from 'react';

export default function LoginForm(props) {
    return (
        <div>
          <h1>Sign Up</h1>
          <div>Username: <input type="text" onChange={props.onUsernameChanged} /></div>
          <div>Password: <input type="password" onChange={props.onPasswordChanged} /></div>
          <div>Favorite Pastry: <input type="password" onChange={props.onFavoritePastryChanged} /></div>
          <button type="button" onClick={props.onSubmit}>Submit</button>
        </div>
    );
}