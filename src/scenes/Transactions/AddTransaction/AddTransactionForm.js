import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
//import PropTypes from 'prop-types';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form'
import MaskedInput from 'react-text-mask'
import { Label, Button, Icon, Segment, Dropdown, Grid, Form } from 'semantic-ui-react'
import style from './AddTransactionForm.module.css'
import dayjs from 'dayjs'
import _ from 'lodash'

// TODO: Search not working in dropdowns currently - probably related to addition of icons. (Maybe add them using before/after CSS?)
// TODO: Icon in dropdown is not aligned with the text.
// TODO: cursor for search seems to be displaced.
// TODO: Top and buttom button groups overflow when viewport is narrow.
// TODO: Check downshift for currencies and exchanges input https://github.com/paypal/downshift
// TODO: Reset button - currently bad implementation is commented out in the code.
// TODO: Refactor missing exchanges and values casting code in onSubmit


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
                    placeholder='Select action'
                    options={TRANSACTIONS}
                />
                <CancelButton onClick={closeModal} />
            </Button.Group>
            <Segment />
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
                                    <Button.Group style={{zIndex: 0}} attached='bottom'>
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
        <div style={{ padding: "10em 0" }}>
            <span style={{ color: "#aaa" }}>Choose an operation</span>
        </div>
    </React.Fragment>
)

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
    <InnerRow label={`Date & time`}>
        <Field name="date" component={DateSelectAdapter} />
        <Field name="time" component={TimeInputAdapter} validate={properTime} />
    </InnerRow>
)

const CommentSegment = () => (
    <Segment>
        <Field className="field"
            name="comment"
            placeholder="If you want, enter a comment here"
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
        <InnerRowTitle label={label} />
        <FieldsGroup width="equal" style={{ marginBottom: "0.25em" }}>
            {React.Children.map(children, (child) => {
                return !!child && React.cloneElement(child, { ...props })
            })}
        </FieldsGroup>
    </Segment >
)

const InnerRowTitle = (props) => (
    <div style={{ margin: "-1.8em 0 0.2em 0", background: "none" }}>
        <span style={{ background: "white", padding: "0 4em", fontWeight: "bold" }}>
            {props.label}
        </span>
    </div>
)

const InnerRowDropdown = ({ input, meta, optional, ...props }) => {
    const validate = optional ? null : required
    return (
        <div className={`field fluid ${style.innerinput}`}>
            <Field
                component={DropdownAdapter}
                className={`fluid icon basic ${style.dropdown}`}
                search
                {...props}
                {...input}
                validate={validate}
            />
        </div>
    )
}

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
        {...props}
        component={ValueInputAdapter} />
)

const ValueInputAdapter = ({ input, meta, ...props }) => (
    <div className={`field ${style.innerinput}`}>
        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        <input {...input} {...props} />
    </div>
)

const ErrorLabel = (props) => (
    <Label color='red' pointing='below'>{props.children}</Label>
)

const CurrencyInput = ({ operation, symbols, ...props }) => (
    <InnerRowDropdown
        name={`${operation}.currency`}
        placeholder='Currency'
        options={symbols}
        {...props}
    />
)

const ExchangeInput = ({ operation, exchanges }) => (
    <InnerRowDropdown
        name={`${operation}.exchange`}
        placeholder='Exchange'
        options={exchanges}
    />
)

const parseDate = string => {
    const [day, month, year] = string.split('/')
    const date = dayjs(`${year}-${month}-${day}`)
    return date.isValid() ? date.toDate() : undefined
}


const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

const YearMonthForm = ({ date, localeUtils, onChange }) => {
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <div class="DayPicker-Caption">
            <div style={{display: "flex", justifyContent: "space-between"}}> 
            <Dropdown placeholder='Month' options={months.map(el => ({text: el, value: el}))} />
            <Dropdown placeholder='Year' options={years.map(el => ({text: el, value: el}))} />
            </div>
            {/* <select name="month" onChange={handleChange} value={date.getMonth()}>
                {months.map((month, i) => (
                    <option key={month} value={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" onChange={handleChange} value={date.getFullYear()}>
                {years.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select> */}
        </div>
    );
}

const DateSelectAdapter = ({ input, meta, label, ...props }) => {
    const { value, ...inputProps } = input
    return (
        <div className={`field ${style.innerinput} ${style.datepicker}`}>
            <label>{label}</label>
            <DayPickerInput
                keepFocus={false}
                placeholder="DD/MM/YYYY"
                formatDate={date => dayjs(date).format("DD/MM/YYYY")}
                parseDate={parseDate}
                dayPickerProps={{
                    fromMonth: new Date(2010, 6, 16),
                    toMonth: new Date(),
                    captionElement: ({ date, localeUtils }) => (
                        <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={(e) => console.log(e)}
                        />)
                }}
                showOutsideDays
                disabledDays={[{
                    after: new Date(),
                    before: new Date(2010, 6, 16)
                }]}
                inputProps={{ ...inputProps }}
                value={dayjs(value).format('DD/MM/YYYY')}
            />
        </div>
    )
}

const TimeInputAdapter = ({ input, meta, label, ...props }) => (
    <div className={`field ${style.innerinput}`}>
        <label>{label}</label>
        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        <MaskedInput
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
            placeholder="HH:MM:SS"
            keepCharPositions
            {...input}
            {...props} />
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