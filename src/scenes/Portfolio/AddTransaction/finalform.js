import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-overrides.css'
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

//const onSubmit = async values => {
//    await sleep(300);
//    window.alert(JSON.stringify(values, 0, 2));
//};

const required = value => (value ? undefined : "Required")

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
                subscription={subscription}
                initialValues={INITIAL_VALUES}
                render={({ handleSubmit, reset, submitting, pristine, invalid, values }) => (
                    <form onSubmit={handleSubmit} className={`ui form ${style.form}`}>
                        <Segment.Group>
                            <Button.Group attached="top">
                                <Field
                                    name="operation"
                                    component={DropdownAdapter}
                                    className={`ui primary icon ${style.transaction}`}
                                    placeholder='Select action'
                                    options={TRANSACTIONS}
                                    validate={required}
                                    primary
                                />
                                <CancelButton />
                            </Button.Group>
                            <Segment />
                            <InnerRow label={`Date & time`}>
                                <Field
                                    className={`field ${style.innerinput}`}
                                    name="date"
                                    component={DateSelectAdapter}
                                />
                                <MaskedTimeField name="time" className={`field ${style.innerinput}`} />
                            </InnerRow>
                            <InnerRow label="Bought" operation="in">
                                <ExchangeInput operation="in" exchanges={EXCHANGES} />
                                <CurrencyInput operation="in" symbols={SYMBOLS} />
                                <ValueInput operation="in" />
                            </InnerRow>
                            <InnerRow label="Sold" operation="out">
                                <ExchangeInput operation="out" exchanges={EXCHANGES} />
                                <CurrencyInput operation="out" symbols={SYMBOLS} />
                                <ValueInput operation="out" />
                            </InnerRow>
                            <InnerRow label="Fee" operation="fee">
                                <CurrencyInput operation="fee" symbols={SYMBOLS} />
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
    )
}


const DropdownAdapter = ({ input, meta, ...rest }) => (
    <React.Fragment>
        <Dropdown
            {...input}
            {...rest}
            labeled
            button
            onChange={(event, data) => input.onChange(data.value)}
        />
        {meta.error && meta.touched && alert("eerrr")}
    </React.Fragment>
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
    <div style={{ margin: "-1.8em 0 0.2em 0", background: "none" }}>
        <span style={{ background: "white", padding: "0 4em", fontWeight: "bold" }}>
            {props.label}
        </span>
    </div>
)


const InnerRowDropdown = ({ input, meta, ...rest }) => (
    <div className={`field fluid ${style.innerinput}`}>
        <label style={{ visibility: "hidden" }}>None</label>
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
        placeholder='Currency'
        options={symbols}
    />
)

const ExchangeInput = ({ operation, exchanges }) => (
    <InnerRowDropdown
        name={`${operation}.exchange`}
        placeholder='Exchange'
        options={exchanges}
    />
)

const InnerRow = ({ operation, label, children }) => (
    <Segment className={style.formRow}>
        <InnerRowTitle label={label} />
        <FieldsGroup width="equal" style={{marginBottom: "0.25em"}}>
            {children}
        </FieldsGroup>
    </Segment >
)

const DateSelectAdapter = ({ input, meta, ...rest }) => {
    const { value, ...props } = input
    return (
        <div className={`field ${style.innerinput} ${style.datepicker}`}>
            <label>{rest.label}</label>
            <DatePicker
                className={style.datepicker}
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