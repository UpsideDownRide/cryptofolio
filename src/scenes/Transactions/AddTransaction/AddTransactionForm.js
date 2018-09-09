import React from 'react'
import DateSelectAdapter from './DateSelectAdapter'
//import PropTypes from 'prop-types';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form'
import MaskedInput from 'react-text-mask'
import { Button, Icon, Segment, Dropdown, Grid, Form } from 'semantic-ui-react'
import { ErrorLabel } from 'components/ErrorLabel'
import style from './AddTransactionForm.module.css'
import dayjs from 'dayjs'
import _ from 'lodash'
import DownshiftInput from './DownshiftInput';
import FloatingLabel from './FloatingLabel';

// TODO: Search not working in dropdowns currently - probably related to addition of icons. (Maybe add them using before/after CSS?)
// TODO: Icon in dropdown is not aligned with the text.
// TODO: cursor for search seems to be displaced.
// TODO: Reset button - currently bad implementation is commented out in the code.
// TODO: Refactor missing exchanges and values casting code in onSubmit
// TODO: Enter key closes the modal - should only happen when focus is on the add transaction button

const required = value => (value ? undefined : "Required")
const mustBeNumber = value => (!isNaN(value) ? undefined : "Enter a valid number")
const properTime = value => (/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(value) ? undefined : "Enter valid time")
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const normalizeValue = value => {
    if (!value) return value
    const onlyNums = value.replace(/,/g, '.').replace(/[^0-9.]/g, '')
    return onlyNums
}

const formatDateTime = (date, time) => {
    const [h, m, s] = time.split(':')
    return dayjs(date).set({ hour: h, minute: m, second: s, millisecond: 0 }).valueOf()
}

const normalizeBeforeSubmit = values => {
    values.date = formatDateTime(values.date, values.time)
    values.in && !values.in.exchange && _.set(values, 'in.exchange', values.out.exchange)
    values.out && !values.out.exchange && _.set(values, 'out.exchange', values.in.exchange)
    values.fee && _.set(values, 'fee.exchange', _.get(values, 'out.exchange') || _.get(values, 'in.exchange'))
    const valuesAsNumbers = _(values).pick(['in.value', 'out.value', 'fee.value']).mapValues(key => ({ value: Number(key.value) })).value()
    const normalizedTransaction = _(values).omit('time').merge(valuesAsNumbers).value()
    return normalizedTransaction
}


const onSubmit = (submitTransactions, closeModal) => values => {
    submitTransactions([normalizeBeforeSubmit(values)])
    closeModal()
};

const TransactionForm = ({ formValues, subscription, submitTransactions, closeModal, ...props }) => {
    const {
        INITIAL_VALUES,
        ...CONSTANTS
    } = formValues

    return (
        <Grid centered padded>
            <FinalForm
                onSubmit={onSubmit(submitTransactions, closeModal)}
                subscription={subscription}
                initialValues={INITIAL_VALUES}
                render={FormContent}
                {...CONSTANTS}
                closeModal={closeModal}
            />
        </Grid>
    )
}

const FormContent = ({ handleSubmit, reset, submitting, pristine, invalid, form, TRANSACTIONS, EXCHANGES, SYMBOLS, closeModal }) => (
    <Form onSubmit={handleSubmit} className={`ui form ${style.form}`}>
        <Segment.Group>
            <Button.Group attached="top">
                <Field
                    name="operation"
                    component={DropdownAdapter}
                    className={`ui primary icon ${style.transaction}`}
                    placeholder='Select operation'
                    options={TRANSACTIONS}
                />
                <CancelButton onClick={closeModal} />
            </Button.Group>
            <FormSpy subscription={{ values: true }}>
                {({ values }) => {
                    const chosenOperation = _.get(values, 'operation', false)
                    return (
                        <React.Fragment>
                            {!chosenOperation && <FormFillerSegment />}
                            {chosenOperation &&
                                <React.Fragment>
                                    <DateTimeSegment />
                                    <DisplayConditionalContent
                                        operation={chosenOperation}
                                        exchanges={EXCHANGES}
                                        symbols={SYMBOLS}
                                        changeValue={form.change}
                                    />
                                    <CommentSegment />
                                    <Button.Group style={{ zIndex: 0 }} attached='bottom'>
                                        <AddTransactionButton />
                                    </Button.Group>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    )
                }}
            </FormSpy>
        </Segment.Group>
    </Form>
)


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

const CancelButton = (props) => (
    <Button
        icon
        labelPosition="right"
        negative
        {...props}
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

const FormFillerSegment = () => (
    <React.Fragment>
        <div style={{ padding: "10em" }}>
            <span style={{ color: "#aaa" }}>Choose an operation</span>
        </div>
    </React.Fragment>
)

// TODO: following are very repetitive consider refactor

const TradeContent = ({ exchanges, ...props }) => (
    <React.Fragment>
        <InRow label="Bought" exchanges={exchanges} {...props} />
        <OutRow label="Sold" {...props} />
        <FeeRow {...props} />
    </React.Fragment>
)

const TransferContent = ({ exchanges, ...props }) => (
    <React.Fragment>
        <OutRow label="From" exchanges={exchanges} {...props} />
        <InRow label="To" exchanges={exchanges} {...props} />
        <FeeRow {...props} />
    </React.Fragment>
)

const DepositContent = ({ exchanges, ...props }) => (
    <React.Fragment>
        <InRow label="Deposit" exchanges={exchanges} {...props} />
        <FeeRow {...props} />
    </React.Fragment>
)

const WithdrawContent = ({ exchanges, ...props }) => (
    <React.Fragment>
        <OutRow label="Withdraw" exchanges={exchanges} {...props} />
        <FeeRow {...props} />
    </React.Fragment>
)

const MiningContent = ({ exchanges, ...props }) => (
    <React.Fragment>
        <InRow label="Mined" exchanges={exchanges} {...props} />
        <FeeRow {...props} />
    </React.Fragment>
)

const CONTENT_COMPONENTS = {
    'Trade': TradeContent,
    'Transfer': TransferContent,
    'Deposit': DepositContent,
    'Withdraw': WithdrawContent,
    'Mining': MiningContent,
}

const DisplayConditionalContent = ({ operation, ...props }) => {
    const ContentComponent = CONTENT_COMPONENTS[operation]
    return <ContentComponent {...props} />
}

const DateTimeSegment = () => (
    <InnerRow label="">
        <Field name="date" component={DateSelectAdapter} />
        <Field name="time" component={TimeInputAdapter} validate={properTime} />
    </InnerRow>
)

const CommentSegment = () => (
    <Segment>
        <Field className="field"
            name="comment"
            placeholder="Enter a comment"
            component={TextAreaAdapter}
        />
    </Segment>
)

const FeeRow = (props) => <TransactionRow optional label="Fee" operation="fee" {...props} />
const InRow = (props) => <TransactionRow operation="in" {...props} />
const OutRow = (props) => <TransactionRow operation="out" {...props} />

class TransactionRow extends React.Component {

    componentWillUnmount() {
        this.props.changeValue(this.props.operation, undefined)
    }

    render() {
        // TODO: Refactor so that we pass in what we want to render as an option
        const isNotSoldOrFee = this.props.label !== "Sold" && this.props.operation !== "fee"
        return (
            <InnerRow label={this.props.label} operation={this.props.operation}>
                {isNotSoldOrFee && <ExchangeInput exchanges={this.props.exchanges} />}
                <CurrencyInput optional={this.props.optional} symbols={this.props.symbols} />
                <ValueInput optional={this.props.optional} />
            </InnerRow>
        )
    }
}

const InnerRow = ({ label, children, ...props }) => (
    <Segment className={style.formRow}>
        {!!label && <InnerRowTitle label={label} /> }
        <FieldsGroup width="equal" style={{ marginBottom: "0.25em" }}>
            {React.Children.map(children, (child) => {
                return !!child && React.cloneElement(child, { ...props })
            })}
        </FieldsGroup>
    </Segment >
)

const InnerRowTitle = (props) => (
    <div style={{ margin: "-1.8em auto 0.4em auto", width: "9em", background: "white" }}>
        <span style={{ fontWeight: "bold" }}>
            {props.label}
        </span>
    </div>
)

const DropdownAdapter = ({ input, meta, ...props }) => {
    const fieldError = meta.error && meta.touched
    return (
        <React.Fragment>
            {fieldError && <ErrorLabel>{meta.error}</ErrorLabel>}
            <Dropdown
                {...input}
                {...props}
                labeled
                button
                onChange={(_, data) => input.onChange(data.value)}
            />
        </React.Fragment>
    )
}

const ValueInput = ({ operation, optional, ...props }) => (
    <Field
        name={`${operation}.value`}
        placeholder="Enter amount"
        parse={normalizeValue}
        validate={!optional && composeValidators(required, mustBeNumber)}
        component={ValueInputAdapter}
        {...props}
    />
)

const ValueInputAdapter = ({ input, meta, ...props }) => (
    <div className={`field ${style.innerinput}`}>
        <div style={{ position: "relative" }}>
            <FloatingLabel visible={!!input.value.length} label="Amount" />
            {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
            <input {...input} {...props} />
        </div>
    </div>
)

const CurrencyInput = ({ operation, symbols, ...props }) => (
    <InnerRowDownshift
        name={`${operation}.currency`}
        placeholder='Enter currency'
        items={symbols.map(({ value }) => ({ value: value, label: value }))}
        {...props}
    />
)

const InnerRowDownshift = ({ optional, ...props }) => (
    <div className={`field fluid ${style.innerinput}`}>
        <Field
            component={DownshiftInput}
            validate={!optional && required}
            {...props}
        />
    </div>
)

const ExchangeInput = ({ operation, exchanges, ...props }) => (
    <InnerRowDownshift
        name={`${operation}.exchange`}
        placeholder='Enter exchange'
        items={exchanges.map(({ value }) => ({ value: value, label: value }))}
        {...props}
    />
)


const TimeInputAdapter = ({ input, meta, label, ...props }) => (
    <div className={`field ${style.innerinput}`}>
        <label>{label}</label>
        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        <div style={{ position: "relative" }}>
            <FloatingLabel visible={!!input.value.length} label="Time" />
            <MaskedInput
                mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
                placeholder="HH:MM:SS"
                keepCharPositions
                {...input}
                {...props}
            />
        </div>
    </div>
)

const TextAreaAdapter = ({ input, meta, ...props }) => {
    const style = {
        minHeight: "3em",
        maxHeight: "3em",
        padding: "0px",
        resize: "none",
        border: "none"
    }
    return (
        <textarea style={style} {...input} {...props} />
    )
}

const FieldsGroup = ({ children, ...props }) => (
    <div className="fields fluid" {...props}>
        {children}
    </div>
)

export default TransactionForm