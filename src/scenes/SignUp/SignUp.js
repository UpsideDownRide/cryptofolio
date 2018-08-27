import React, { Component } from 'react';
import { Field, Form as FinalForm } from 'react-final-form'
import { Loader, Button, Form, Grid, Message, Segment, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ROUTES from 'common/constants/routes'
import { compose, memoize } from 'lodash/fp'
import { connect } from 'react-redux'
import { createUser } from 'common/user/userActions'
import ErrorLabel from 'components/ErrorLabel'
import { withRouter } from 'react-router-dom'
import { isEmailAvailable } from 'common/firebase/auth';
import style from './SignUp.module.css'
import PasswordEye from 'components/PasswordEye'
import ValidateSpinner from 'components/ValidateSpinner'
import FloatingLabel from '../Transactions/AddTransaction/FloatingLabel';

//TODO: Think about refactoring the SignUp and Login since they are so similar

const SignUpPage = () => (
    <div className='signup-form'>
        <Grid className={style.grid} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <ConnectedFormContainer />
                <Message info>
                    Already have an account? <Link to={ROUTES.login}><strong>Login here</strong></Link> instead.
                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

class FormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { submitting: false, visiblePassword: false, error: false }
        this.onSubmit = this.onSubmit.bind(this)
    }

    setSubmitting = (bool) => this.setState({ submitting: bool })
    togglePasswordVisibility = () => this.setState({ visiblePassword: !this.state.visiblePassword })

    onSubmit = ({ email, password }) => {
        if (!email && !password) return false
        this.setSubmitting(true)
        this.setState({ error: false })
        return this.props.createUser(email, password)
            .then(() => this.props.history.push(ROUTES.transactions))
            .catch(error => this.setState({ error: error.message }))
            .finally(() => this.setSubmitting(false))
    }

    render() {
        const options = {
            togglePasswordVisibility: this.togglePasswordVisibility,
            visiblePassword: this.state.visiblePassword,
            errorMessage: this.state.error,
        }
        return (
            <FinalForm
                onSubmit={this.onSubmit}
                render={(props) => <FormContent {...options} {...props} />}
                isSubmitting={this.state.submitting}
                validateOnBlur={true}
            />
        )
    }
}

const validateEmail = memoize(async value => {
    if (!value) {
        return "Required";
    }
    if (!await isEmailAvailable(value)) {
        return "Email already in use"
    }
})

const FormContent = ({ handleSubmit, isSubmitting, errorMessage, visiblePassword, togglePasswordVisibility, validating, ...props }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Segment attached>
                {!!errorMessage && <Message negative style={{ maxWidth: "22em" }}>{errorMessage}</Message>}
                <ValidateSpinner visible={validating}>
                    <Field
                        name='email'
                        type='email'
                        component={FormInputAdapter}
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                        validate={validateEmail}
                    />
                </ValidateSpinner>
                <PasswordEye handleOnClick={togglePasswordVisibility} visiblePassword={visiblePassword}>
                    <Field
                        name='password'
                        component={FormInputAdapter}
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type={visiblePassword ? "text" : "password"}
                    />
                </PasswordEye>
                <Button color='green' fluid size='large'>
                    {isSubmitting ? <TinyLoader /> : 'Sign Up'}
                </Button>
            </Segment>
        </Form>
    )
}

const TinyLoader = () => <Loader style={{ margin: "-1em" }} inline inverted active size='tiny' />

const FormInputAdapter = ({ input, meta, ...props }) => {
    const fieldError = meta.error && meta.touched
    return (
        <React.Fragment>
            {fieldError && <ErrorLabel>{meta.error}</ErrorLabel>}
            <Form.Input>
                <FloatingLabel style={{left: "4.5em"}} visible={!!input.value.length} label={input.name} />
                <Input 
                    fluid
                    {...input}
                    {...props}
                    onChange={(_, data) => input.onChange(data.value)} />
            </Form.Input>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => (state.user)
const mapDispatchToProps = dispatch => ({
    createUser: (email, password) => dispatch(createUser(email, password)),
})

const ConnectedFormContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FormContainer)

export default SignUpPage