import React, {Component} from "react";
import {
    Redirect
} from "react-router-dom";

export default class Signin extends Component {
    constructor() {
        super();

        this.state = {};
    }

    emailChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        const {signUp, signIn} = this.props;
        const {formType, username, password} = this.state;
        e.preventDefault(); // Do not let the form post

        switch(formType) {
            case 'signup':
                return signUp(username, password);
            case 'signin':
                return signIn(username, password);
            default:
                console.error('Unkown formType', formType);
                return null; // Not sure what happened here
        }

    }

    signUpClick = () => {
        this.setState({
            formType: 'signup',
        });
    }

    signInClick = () => {
        this.setState({
            formType: 'signin',
        });
    }

    renderSignInError() {
        const { signInError } = this.props;

        if (!signInError) {
            return null;
        }

        return (
            <div class="alert alert-danger" role="alert">
                {signInError}
            </div>
        );
    }

    render() {
        const { authenticated } = this.props;
        if (authenticated) {
            return <Redirect to="/Messages" />
        } 
        return (
            <div>
                <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Sign In</h1>
                </div>
                {this.renderSignInError()}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.emailChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.passwordChange} />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" className="btn btn-primary" onClick={this.signInClick}>Sign In</button>
                        <button type="submit" className="btn btn-secondary" onClick={this.signUpClick}>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}
    