import React from 'react';

import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
//import PropTypes from 'prop-types';

import { Field, Form, FormSpy } from 'react-final-form'
import MaskedInput from 'react-text-mask'

import { Button, Icon, Segment, Dropdown, Grid } from 'semantic-ui-react'

import style from './AddTransactionForm.module.css'
import { SYMBOLS } from 'common/mockData/currencies'

// TODO: Top margins of inputs when the modal is narrow
// TODO: Time control to change the same field as date
// TODO: Dropdown icon at the select action button is not rounded
// TODO: Top button group breaks when viewport is narrow
// TODO: Check downshift for currencies and exchanges input https://github.com/paypal/downshift

const INITIAL_VALUES = { "date": moment() }
const SYMBOLS_ = SYMBOLS.map(el => ({ key: el, value: el, text: el }))
const validate = () => true

const TRANSACTIONS = [{ key: 'withdraw', value: 'withdraw', text: 'Withdraw' },
{ key: 'buy', value: 'buy', text: 'Buy' },
{ key: 'sell', value: 'sell', text: 'Sell' },
{ key: 'mining', value: 'mining', text: 'Mining' }]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const SUBMIT_FORM = 'SUBMIT_FORM'

const submitForm = (form) => {{type: SUBMIT_FORM, form}}

const DateSelectAdapter = ({ input, meta, ...rest }) => {
    const { value, ...props } = input
    return (
        <div className="field">
            <label>{rest.label}</label>
            <DatePicker
                fixedHeight
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={moment(value)} {...props} />
        </div>
    )
}

const TextAreaAdapter = ({ input, meta, ...rest }) => {
    const style = {
        minHeight: "3em",
        maxHeight: "3em",
        padding: "0px",
        resize: "none",
        border: "none"
    }
    return (
        <textarea style={style} {...input} {...rest} />
    )
}

const MaskedTimeField = (props) => {
    const { label, ...rest } = props
    return (
        <div className="field">
            <label>{label}</label>
            <MaskedInput
                mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
                placeholder="HH:MM:SS"
                keepCharPositions
                {...rest} />
        </div>
    )
}

const FieldsGroup = (props) => {
    const { children, ...rest } = props
    return (
        <div className="fields fluid" {...rest}>
            {children}
        </div>
    )
}

const LabeledField = (props) => {
    const { label, ...rest } = props
    return (
        <div className="field">
            <label>{label}</label>
            <Field {...rest} />
        </div>
    )
}

const metaExample = () => (
    <Field name="phone">
        {({ input, meta }) => (
            <div>
                <label>Phone</label>
                <input type="text" {...input} placeholder="Phone" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
        )}
    </Field>
)
const LoginForm = ({ subscription }) => (
    <Grid centered padded>
        <Form
            onSubmit={onSubmit}
            validate={validate}
            subscription={subscription}
            initialValues={INITIAL_VALUES}
            render={({ handleSubmit, reset, submitting, pristine, invalid, values }) => (

                <form onSubmit={handleSubmit} className="ui form">
                    <Segment.Group>
                        <Button.Group attached="top">
                            <Field name="operation">
                                {({ input, meta }) => (

                                    <Dropdown className='ui primary icon'
                                        placeholder='Select action'
                                        labeled
                                        button
                                        style={{ flex: 1000 }}
                                        options={TRANSACTIONS}
                                        onChange={(param, data) => input.onChange(data.value)} />

                                )}
                            </Field>
                            <Button
                                icon
                                labelPosition="right"
                                onClick={() => reset(INITIAL_VALUES)}
                                disabled={submitting || pristine}
                            >

                                <Icon name="redo"></Icon>
                                Reset
                            </Button>
                            <Button
                                icon
                                labelPosition="right"
                                negative>
                                <Icon name="window close outline"></Icon>
                                Cancel

                            </Button>
                        </Button.Group>
                        <Segment>
                            <FieldsGroup>
                                <Field className="field"
                                    label="Enter date:"
                                    name="date"
                                    component={DateSelectAdapter}
                                />
                                <MaskedTimeField name="time" label="Enter time:" />
                            </FieldsGroup>
                        </Segment>
                        <CurrencyRow label="Bought" operation="buy" />
                        <CurrencyRow label="Sold" operation="sell" />
                        <CurrencyRow label="Fee" operation="fee" />
                        <Segment>
                            <Field className="field"
                                name="comment"
                                placeholder="Enter comment (optional)"
                                component={TextAreaAdapter}
                            />
                        </Segment>
                        <Button.Group attached='bottom'>
                            <Button as="button" type="submit" disabled={pristine || invalid} size="big" positive><Icon name='plus' />Add Transaction</Button>
                        </Button.Group>
                    </Segment.Group>
                    <FormSpy subscription={{ values: true }}>
                        {({ values }) => (
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        )}
                    </FormSpy>
                </form>
            )}
        />
    </Grid>
)

const CurrencyRowTitle = (props) => (
    <div style={{ margin: "-1.8em 0 0.8em 0", background: "none" }}>
        <span style={{ background: "white", padding: "0 4em", fontWeight: "bold" }}>
            {props.label}
        </span>
    </div>
)
const CurrencyRow = (props) => {
    const { operation, label } = props
    return (
        <Segment className={style.formRow}>
            <CurrencyRowTitle label={label} />
            <FieldsGroup width="equal">
                <div className="field fluid" style={{ flex: "1 0" }}>
                    <Field name={`${operation}-exchange`}>
                        {({ input, meta }) => (
                            <Dropdown className='fluid icon basic'
                                placeholder='Select Currency'
                                labeled button search options={SYMBOLS_} onChange={(param, data) => input.onChange(data.value)} />
                        )}
                    </Field>
                </div>
                <div className="field fluid" style={{ flex: "1 0" }}>
                    <Field name={`${operation}-currency`}>
                        {({ input, meta }) => (
                            <Dropdown className='fluid icon basic'
                                placeholder='Select Currency'
                                labeled button search options={SYMBOLS_} onChange={(param, data) => input.onChange(data.value)} />
                        )}
                    </Field>
                </div>
                <LabeledField
                    label="Value"
                    name={`${operation}-value`}
                    component="input"
                    placeholder="Enter amount"
                />
            </FieldsGroup>
        </Segment >
    )
}

export default LoginForm