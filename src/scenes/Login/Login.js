import React, { Component } from 'react';
import { Field, Form as FinalForm } from 'react-final-form'
import { Loader, Label, Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ROUTES from 'common/constants/routes'
import { set } from 'lodash/fp'
import { loginUser } from 'common/user/userActions'
import { connect } from 'react-redux'

const LoginPage = () => (
    <div className='login-form'>
        <Grid padded textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <ConnectedFormContainer />
                <Message>
                    <Link to={ROUTES.signup}>Signup</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

class FormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { submitting: false }
        this.onSubmit = this.onSubmit.bind(this)
    }

    setSubmitting = (bool) => this.setState(set('submitting', bool, this.state))

    onSubmit = ({ email, password }) => {
        if (!email && !password) return false
        this.setSubmitting(true)
        this.props.loginUser(email, password)
            .then(() => alert('Login success'))
            .catch((error) => alert(error))
            .then(() => this.setSubmitting(false))
    }

    render() {
        return (
            <FinalForm
                onSubmit={this.onSubmit}
                render={FormContent}
                isSubmitting={this.state.submitting}
            />
        )
    }
}


const FormContent = ({ handleSubmit, isSubmitting }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Segment attached>
                <Field
                    name='email'
                    component={FormInputAdapter}
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                />
                <Field
                    name='password'
                    component={FormInputAdapter}
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />
                <Button color='blue' fluid size='large'>
                    {isSubmitting ? <TinyLoader /> : 'Login'}
                </Button>
            </Segment>
        </Form>
    )
}

const TinyLoader = () => <Loader style={{ margin: "-1em" }} active inline inverted size='tiny' />

const FormInputAdapter = ({ input, meta, ...props }) => {
    const fieldError = meta.error && meta.touched
    return (
        <React.Fragment>
            {fieldError && <ErrorLabel>{meta.error}</ErrorLabel>}
            <Form.Input
                fluid
                {...input}
                {...props}
                onChange={(_, data) => input.onChange(data.value)}
            />
        </React.Fragment>
    )
}

const ErrorLabel = (props) => (
    <Label color='red' pointing='below'>{props.children}</Label>
)

const mapStateToProps = (state) => (state.user)
const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
})
const ConnectedFormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer)

export default LoginPage