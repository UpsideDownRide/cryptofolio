import React, { Component } from 'react';
import { Field, Form as FinalForm } from 'react-final-form'
import { Loader, Button, Form, Grid, Message, Segment, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ROUTES from 'common/constants/routes'
import { set, compose } from 'lodash/fp'
import { loginUser } from 'common/user/userActions'
import { connect } from 'react-redux'
import ErrorLabel from 'components/ErrorLabel'
import { withRouter } from 'react-router-dom'
import { getAllTrades } from 'common/transactions/transactionsSelectors';
import style from './Login.module.css'
import PasswordEye from 'components/PasswordEye'
import ValidateSpinner from 'components/ValidateSpinner'
import FloatingLabel from '../Transactions/AddTransaction/FloatingLabel';

const LoginPage = () => (
    <div className='login-form'>
        <Grid className={style.grid} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: "22em" }}>
                <ConnectedFormContainer />
                <Message positive>
                    Don't have account yet? <Link to={ROUTES.signup}><strong>Sign up here</strong></Link>, it's free.
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

    setSubmitting = (bool) => this.setState(set('submitting', bool, this.state))
    togglePasswordVisibility = () => this.setState({ visiblePassword: !this.state.visiblePassword })

    onSubmit = ({ email, password }) => {
        if (!email && !password) return false
        this.setSubmitting(true)
        this.props.loginUser(email, password)
            .then(() => {
                this.setSubmitting(false)
                this.props.history.push(this.props.tradesCount ? ROUTES.dashboard : ROUTES.transactions)
            })
            .catch(error => {
                this.setSubmitting(false)
                this.setState({ error: error.message })
            })
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
                render={FormContent}
                render={(props) => <FormContent {...options} {...props} />}
                isSubmitting={this.state.submitting}
                validateOnBlur={true}
            />
        )
    }
}

const FormContent = ({ handleSubmit, isSubmitting, errorMessage, visiblePassword, togglePasswordVisibility }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Segment attached>
                {!!errorMessage && <Message negative style={{ maxWidth: "22em" }}>{errorMessage}</Message>}
                <Field
                    name='email'
                    component={FormInputAdapter}
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                />
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

const mapStateToProps = (state) => ({
    tradesCount: getAllTrades(state)
})

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
})

const ConnectedFormContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FormContainer)

export default LoginPage