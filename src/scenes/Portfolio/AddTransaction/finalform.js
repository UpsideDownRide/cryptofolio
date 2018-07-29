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

// TODO: Validation of form input
// TODO: Time control to change the same field as date
// TODO: Dropdown icon at the select action button is not rounded
// TODO: Top button group breaks when viewport is narrow
// TODO: Check downshift for currencies and exchanges input https://github.com/paypal/downshift
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
                render={({ handleSubmit, reset, submitting, pristine, invalid, form }) => (
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
                                            {operationValue &&
                                                <React.Fragment>
                                                    <DateTimeSegment />
                                                    <DisplayConditionalContent operationValue={operationValue}
                                                        exchanges={EXCHANGES}
                                                        symbols={SYMBOLS}
                                                        changeValue={form.change} />
                                                    <CommentSegment />
                                                    <Button.Group attached='bottom'>
                                                        <AddTransactionButton disabled={pristine || invalid} />
                                                    </Button.Group>
                                                </React.Fragment>
                                            }
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
        <div style={{ padding: "10em 0" }}>
            <span style={{ color: "#aaa" }}>Choose an operation</span>
        </div>
    </React.Fragment>
)

const BuyContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <InRow label="Bought" exchanges={exchanges} {...rest} />
        <OutRow label="Price" {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const SellContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <OutRow label="Sold" exchanges={exchanges} {...rest} />
        <InRow label="Price" {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const TransferContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <OutRow label="From" exchanges={exchanges} {...rest} />
        <InRow label="To" exchanges={exchanges} {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const DepositContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <InRow label="Deposit" exchanges={exchanges} {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const WithdrawContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <OutRow label="Withdraw" exchanges={exchanges} {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const MiningContent = ({ exchanges, ...rest }) => (
    <React.Fragment>
        <InRow label="Mined" operation="in" exchanges={exchanges} {...rest} />
        <FeeRow {...rest} />
    </React.Fragment>
)

const CONTENT_COMPONENTS = {
    'Buy': BuyContent,
    'Sell': SellContent,
    'Transfer': TransferContent,
    'Deposit': DepositContent,
    'Withdraw': WithdrawContent,
    'Mining': MiningContent,
}

const DisplayConditionalContent = ({ operationValue, ...rest }) => {
    const ContentComponent = CONTENT_COMPONENTS[operationValue]
    return <ContentComponent {...rest} />
}

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

const FeeRow = (props) => <TransactionRow label="Fee" operation="fee" {...props} />
const InRow = (props) => <TransactionRow operation="in" {...props} />
const OutRow = (props) => <TransactionRow operation="out" {...props} />

class TransactionRow extends React.Component {

    componentWillUnmount() {
        this.props.changeValue(this.props.operation, undefined)
    }

    render() {
        const isNotPriceOrFee = this.props.label !== "Price" && this.props.operation !== "fee"
        return (
            <InnerRow label={this.props.label} operation={this.props.operation}>
                {isNotPriceOrFee && <ExchangeInput exchanges={this.props.exchanges} />}
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
    )
}

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
        negative
    >
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
                return !!child && React.cloneElement(child, { operation, ...rest })
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