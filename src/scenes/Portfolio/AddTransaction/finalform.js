import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
//import PropTypes from 'prop-types';
import { Field, Form, FormSpy } from 'react-final-form'
import MaskedInput from 'react-text-mask'
import { Button, Icon, Segment, Dropdown, Grid } from 'semantic-ui-react'
import style from './AddTransactionForm.module.css'
import moment from 'moment'

// TODO: Validation of form input
// TODO: Time control to change the same field as date
// TODO: Dropdown icon at the select action button is not rounded
// TODO: Top button group breaks when viewport is narrow
// TODO: Check downshift for currencies and exchanges input https://github.com/paypal/downshift
// TODO: Send issue about Z-Index of dropdown menu being lower than text in other dropdowns
// TODO: Reset should reset transaction type displayed to select?
// TODO: Closing the modal only with close button 

const validate = (values) => {
    const errors = {}
    if (!values.operation) {
        errors.operation = "Required"
    }
    if (!values.operation) {
        errors.operation = "Required"
    }
    if (!values.operation) {
        errors.operation = "Required"
    }
    return errors
}
//const onSubmit = async values => {
//    await sleep(300);
//    window.alert(JSON.stringify(values, 0, 2));
//};


const TransactionForm = ({ formValues, subscription, onSubmit }) => {
    const { 
        INITIAL_VALUES,
        TRANSACTIONS,
        EXCHANGES,
        SYMBOLS
    } = formValues
    
    return (
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
                            <Field
                                name="operation"
                                component={DropdownAdapter}
                                className={`ui primary icon ${style.transaction}`}
                                placeholder='Select action'
                                options={TRANSACTIONS}
                                primary
                            />
                            <CancelButton />
                        </Button.Group>
                        <Segment />
                        <Segment>
                            <InnerRowTitle label={`Date & time`} />
                            <FieldsGroup>
                                <Field
                                    className={`field ${style.innerinput}`}
                                    name="date"
                                    component={DateSelectAdapter}
                                />
                                <MaskedTimeField name="time" className={`field ${style.innerinput}`} />
                            </FieldsGroup>
                        </Segment>
                        <InnerRow label="Bought" operation="in">
                            <ExchangeInput operation="in" exchanges={EXCHANGES}/>
                            <CurrencyInput operation="in" symbols={SYMBOLS}/>
                            <ValueInput operation="in" />
                        </InnerRow>
                        <InnerRow label="Sold" operation="out">
                            <ExchangeInput operation="out" exchanges={EXCHANGES}/>
                            <CurrencyInput operation="out" symbols={SYMBOLS}/>
                            <ValueInput operation="out" />
                        </InnerRow>
                        <InnerRow label="Fee" operation="fee">
                            <CurrencyInput operation="fee" symbols={SYMBOLS}/>
                            <ValueInput operation="fee" />
                        </InnerRow>
                        <Segment>
                            <Field className="field"
                                name="comment"
                                placeholder="Enter comment (optional)"
                                component={TextAreaAdapter}
                            />
                        </Segment>
                        <Button.Group attached='bottom'>
                            <AddTransactionButton disabled={pristine || invalid} />
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
)}


const DropdownAdapter = ({ input, meta, ...rest }) => (
    <Dropdown
        {...input}
        {...rest}
        labeled
        button
        onChange={(event, data) => input.onChange(data.value)}
    />
)
const ResetButton = (props) => (
    <Button
        icon
        labelPosition="right"
        onClick={() => props.reset(props.initial)}
        {...props}
    >
        <Icon name="redo"></Icon>
        Reset
    </Button>
)
const CancelButton = () => (
    <Button
        icon
        labelPosition="right"
        negative>
        <Icon name="window close outline"></Icon>
        Cancel
    </Button>
)

const AddTransactionButton = (props) => (
    <Button as="button"
        type="submit"
        size="big"
        positive
        {...props}
    >
        <Icon name='plus' />
        Add Transaction
    </Button>
)

const InnerRowTitle = (props) => (
    <div style={{ margin: "-1.8em 0 0.8em 0", background: "none" }}>
        <span style={{ background: "white", padding: "0 4em", fontWeight: "bold" }}>
            {props.label}
        </span>
    </div>
)


const InnerRowDropdown = ({ input, meta, ...rest }) => (
    <div className={`field fluid ${style.innerinput}`}>
        <Field
            component={DropdownAdapter}
            className={`fluid icon basic ${style.dropdown}`}
            search
            {...rest}
            {...input}
        />
    </div>
)

const ValueInput = ({ operation }) => (
    <LabeledField
        label="Value"
        name={`${operation}.value`}
        component="input"
        placeholder="Enter amount"
        className={style.innerinput}
    />
)

const CurrencyInput = ({ operation, symbols }) => (
    <InnerRowDropdown
        name={`${operation}.currency`}
        placeholder='Select currency'
        options={symbols}
    />
)

const ExchangeInput = ({ operation, exchanges }) => (
    <InnerRowDropdown
        name={`${operation}.exchange`}
        placeholder='Select exchange'
        options={exchanges}
    />
)

const InnerRow = ({ operation, label, children }) => (
    <Segment className={style.formRow}>
        <InnerRowTitle label={label} />
        <FieldsGroup width="equal">
            {children}
        </FieldsGroup>
    </Segment >
)

const DateSelectAdapter = ({ input, meta, ...rest }) => {
    const { value, ...props } = input
    return (
        <div className={`field ${style.innerinput}`}>
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

const MaskedTimeField = ({ label, className, ...rest }) => (
    <div className={`field ${className}`}>
        <label>{label}</label>
        <MaskedInput
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
            placeholder="HH:MM:SS"
            keepCharPositions
            {...rest} />
    </div>
)


const FieldsGroup = ({ children, ...rest }) => (
    <div className="fields fluid" {...rest}>
        {children}
    </div>
)

const LabeledField = ({ label, className, ...rest }) => (
    <div className={`field ${className}`}>
        <label>{label}</label>
        <Field {...rest} />
    </div>
)

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

export default TransactionForm