import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
//import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react'
import style from './AddTransactionForm.module.css'
import dayjs from 'dayjs'
import _ from 'lodash'
import FloatingLabel from './FloatingLabel';

// TODO: Form submission cancelled because the form is not connected - go through DayPicker source to identify where ti comes form
// TODO: Reduce the top and bottom margins in dropdowns

class DateSelectAdapter extends React.Component {
    constructor(props) {
        super(props)
        this.fromDate = new Date(2010, 6, 16)
        this.toDate = new Date()
        const inputDate = dayjs(this.props.input.value)
        this.state = {date: inputDate.toDate(), month: inputDate.month(), year: inputDate.year()}
    }

    handleChange = type => (_, d) => {
        const dateToSet = dayjs(this.state.date).set(type, d.value)
        this.setState({date: dateToSet.toDate(), month: dateToSet.month(), year: dateToSet.year()})
    }

    render() {
        return (
            <div className={`field ${style.innerinput} ${style.datepicker}`}>
                <label>{this.props.label}</label>
                <DayPickerInput
                    keepFocus={false}
                    placeholder="DD/MM/YYYY"
                    formatDate={date => dayjs(date).format("DD/MM/YYYY")}
                    component={DayInput}
                    parseDate={parseDate}
                    dayPickerProps={{
                        fromMonth: this.fromDate,
                        toMonth: this.toDate,
                        month: this.state.date,
                        canChangeMonth: false,
                        disabledDays: {
                            after: this.toDate,
                            before: this.fromDate
                        },
                        captionElement: ({ date, localeUtils }) => (
                            <YearMonthForm
                                fromDate={this.fromDate}
                                toDate={this.toDate}
                                month={this.state.month}
                                year={this.state.year}
                                date={this.state.date}
                                localeUtils={localeUtils}
                                onChange={this.handleChange}
                            />),
                    }}
                    inputProps={{ ...this.props.input }}
                    value={dayjs(this.state.date).format('DD/MM/YYYY')}
                />
            </div>
        )
    }
}

const YearMonthForm = ({ date, localeUtils, onChange, fromDate, toDate, month, year }) => {
    const months = localeUtils.getMonths();
    const monthsOptions = months
        .map((month, i) => ({ key: month, text: month, value: i }))
        .filter(o => (
            !(date.getFullYear() === fromDate.getFullYear() && o.value < fromDate.getMonth())
            &&
            !(date.getFullYear() === toDate.getFullYear() && o.value > toDate.getMonth())
        ))
    const years = _.range(fromDate.getFullYear(), toDate.getFullYear() + 1)
    const yearsOptions = years.map(year => ({ key: year, text: year, value: year }))

    return (
        <div className="DayPicker-Caption">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Dropdown
                    name="month"
                    compact
                    scrolling
                    placeholder='Month'
                    onChange={onChange('month')}
                    value={month}
                    options={monthsOptions}
                />
                <Dropdown
                    name="year"
                    compact
                    scrolling
                    placeholder='Year'
                    onChange={onChange('year')}
                    value={year}
                    options={yearsOptions}
                />
            </div>
        </div>
    );
}

const DayInput = (props) => (
    <div style={{ position: "relative" }}>
        <FloatingLabel visible={!!props.value.length} label="Date" />
        <input autoComplete="off" {...props} />
    </div>
)

const parseDate = string => {
    const [day, month, year] = string.split('/')
    const date = dayjs(`${year}-${month}-${day}`)
    return date.isValid() ? date.toDate() : undefined
}


export default DateSelectAdapter