import React, { Component } from 'react';
import { auth, database } from 'common/firebase/interface'
import { Field, Form as FinalForm } from 'react-final-form'
import { Loader, Label, Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ROUTES from 'common/constants/routes'
import { set } from 'lodash/fp'
import { connect } from 'react-redux'
import { createUserSuccess } from 'common/user/userActions'
import { retrieveTransactions } from 'common/transactions/transactionsActions';

const SignUpPage = () => (
    <div className='signup-form'>
        <Grid padded textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <ConnectedFormContainer />
                <Message>
                    <Link to={ROUTES.login}>Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div >
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
        const handleSuccess = user => {
            Promise.all([
                this.props.successfulSignUp(user),
                this.props.loadData(user.uid)
            ])
        }
        // const handleFailure 
        this.setSubmitting(true)

        auth.createUser(email, password)
            .then(result => {
                database.createUser(result.user.uid)
                return result
            })
            .then(result => {
                handleSuccess(result.user)
                alert('Sign up success')
                return result
            })
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
                <Button color='green' fluid size='large'>
                    {isSubmitting ? <TinyLoader /> : 'Sign Up'}
                </Button>
            </Segment>
        </Form>
    )
}

const TinyLoader = () => <Loader style={{margin: "-1em"}} active inline inverted size='tiny'/>

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
    successfulSignUp: (response) => dispatch(createUserSuccess(response)),
    loadData: (uid) => dispatch(retrieveTransactions(uid))
})
const ConnectedFormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer)

export default SignUpPage