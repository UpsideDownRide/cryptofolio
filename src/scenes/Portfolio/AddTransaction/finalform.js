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
import _ from 'lodash/fp'

// TODO: Refactor repating code for conditional content
// TODO: Validation of form input
// TODO: Time control to change the same field as date
// TODO: Dropdown icon at the select action button is not rounded
// TODO: Top button group breaks when viewport is narrow
// TODO: Check downshift for currencies and exchanges input https://github.com/paypal/downshift
// TODO: Send issue about Z-Index of dropdown menu being lower than text in other dropdowns
// TODO: Reset should reset transaction type displayed to select?
// TODO: Closing the modal only with close button 
// TODO: Reset button - currently bad implementation is commented out in the code

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
                render={({ handleSubmit, reset, submitting, pristine, invalid, change }) => (
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
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => {
                                    const operationValue = _.getOr(false, 'operation', values)
                                    return (
                                        <React.Fragment>
                                            {!operationValue && <FormFillerSegment />}
                                            {operationValue && <DateTimeSegment />}
                                            {operationValue === 'Buy' && <BuyContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue === 'Sell' && <SellContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue === 'Trade' && <ExchangeContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue === 'Deposit' && <DepositContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue === 'Withdraw' && <WithdrawContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue === 'Mining' && <MiningContent exchanges={EXCHANGES} symbols={SYMBOLS} changeValue={change} />}
                                            {operationValue &&
                                                (<React.Fragment>
                                                    <CommentSegment />
                                                    <Button.Group attached='bottom'>
                                                        <AddTransactionButton disabled={pristine || invalid} />
                                                    </Button.Group>
                                                </React.Fragment>)}
                                        </React.Fragment>
                                    )
                                }}
                            </FormSpy>

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

const FormFillerSegment = () => (
    <React.Fragment>
        <div style={{padding: "10em 0"}}>
            <span style={{ color: "#aaa" }}>Choose an operation</span>
        </div>
    </React.Fragment>
)

const BuyContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <BuyRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <PriceRow symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const SellContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <SellRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <PriceRow symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const ExchangeContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <BuyRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <SellRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const DepositContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <DepositRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <PriceRow symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const WithdrawContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <WithdrawRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <PriceRow symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const MiningContent = ({ exchanges, symbols, changeValue }) => (
    <React.Fragment>
        <MiningRow exchanges={exchanges} symbols={symbols} changeValue={changeValue} />
        <PriceRow symbols={symbols} changeValue={changeValue} />
        <FeeRow symbols={symbols} changeValue={changeValue} />
    </React.Fragment>
)

const DateTimeSegment = () => (
    <InnerRow label={`Date & time`}>
        <Field
            className={`field ${style.innerinput}`}
            name="date"
            component={DateSelectAdapter}
        />
        <MaskedTimeField name="time" className={`field ${style.innerinput}`} />
    </InnerRow>
)

const CommentSegment = () => (
    <Segment>
        <Field className="field"
            name="comment"
            placeholder="Enter comment (optional)"
            component={TextAreaAdapter}
        />
    </Segment>
)

class BuyRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'in'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Bought" operation={this.operation}>
                <ExchangeInput exchanges={this.props.exchanges} />
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class SellRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'out'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Sold" operation={this.operation}>
                <ExchangeInput exchanges={this.props.exchanges} />
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class DepositRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'in'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Deposit" operation={this.operation}>
                <ExchangeInput exchanges={this.props.exchanges} />
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class WithdrawRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'out'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Withdraw" operation={this.operation}>
                <ExchangeInput exchanges={this.props.exchanges} />
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class MiningRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'in'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Mined" operation={this.operation}>
                <ExchangeInput exchanges={this.props.exchanges} />
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class PriceRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'out'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Price" operation={this.operation}>
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}

class FeeRow extends React.Component {
    constructor(props) {
        super(props)
        this.operation = 'fee'
    }

    componentWillUnmount() {
        this.props.changeValue(this.operation, undefined)
    }

    render() {
        return (
            <InnerRow label="Fee" operation={this.operation}>
                <CurrencyInput symbols={this.props.symbols} />
                <ValueInput />
            </InnerRow>
        )
    }
}


const DropdownAdapter = ({ input, meta, ...rest }) => {
    const fieldError = meta.error && meta.touched
    return (
    <React.Fragment>
        <Dropdown
            {...input}
            {...rest}
            error={fieldError}
            labeled
            button
            onChange={(event, data) => input.onChange(data.value)}
        />
    </React.Fragment>
)}

// const ResetButton = (props) => (
//     <Button
//         icon
//         labelPosition="right"
//         onClick={() => props.reset(props.initial)}
//         {...props}
//     >
//         <Icon name="redo"></Icon>
//         Reset
//     </Button>
// )

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
            validate={required}
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

const InnerRow = ({ operation, label, children, rest }) => (
    <Segment className={style.formRow}>
        <InnerRowTitle label={label} />
        <FieldsGroup width="equal" style={{ marginBottom: "0.25em" }}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { operation, ...rest })
            })}
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

export default TransactionForm