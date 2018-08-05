import React, { Component } from 'react';
import { auth } from 'common/firebase/interface'

const SignUpPage = () =>
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordFirst: '',
    passwordSecond: '',
    error: null
}

class SignUpForm extends Component {
    state = { ...INITIAL_STATE }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordFirst,
        } = this.state;

        auth.createUser(email, passwordFirst)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordFirst,
            passwordSecond,
            error
        } = this.state

        const isInvalid =
            passwordFirst !== passwordSecond ||
            passwordFirst === '' ||
            email === '' ||
            username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={passwordFirst}
                    onChange={event => this.setState(byPropKey('passwordFirst', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordSecond}
                    onChange={event => this.setState(byPropKey('passwordSecond', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

export default SignUpPage;

export {
    SignUpForm,
};