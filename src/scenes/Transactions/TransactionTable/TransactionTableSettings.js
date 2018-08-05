import React from 'react'
import style from './TransactionTablePane.module.css'
import CurrencyIcon from 'common/utils/CurrencyIcon'
import { padDecimal } from 'common/utils/padNumber'
import moment from 'moment'

const currencyCell = props => {
    if (!props.value) return null
    else return (
        <div>
            <span>{padDecimal(props.value.value, 2)}
                <CurrencyIcon style={{margin: "0.15em 0 0 0.8em"}} name={props.value.currency} />
            </span>
            <MinorSpan>{props.value.currency}</MinorSpan>
        </div >
    )
}

const timeCell = props => {
    const momentDate = moment.unix(props.value)
    const date = momentDate.format('LL')
    const time = momentDate.format('HH:mm:ss')
    return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: "0.8em" }}>
            <strong>{date}</strong>
        </span>
        <MinorSpan>{time}</MinorSpan>
    </div>
)}

const MinorSpan = props => (
        <span style={{ color: "#aaa", fontSize: "0.7em", width: "100%", textAlign: "center" }}>
            {props.children}
        </span>
)

const columnsSettings = [{
    Header: 'Date',
    columns: [{
        accessor: 'date',
        Cell: timeCell,
    }]
}, {
    Header: 'Operation',
    columns: [{
        accessor: 'operation',
    }]
}, {
    Header: 'In',
    columns: [{
        Header: 'Amount',
        accessor: 'in',
        className: style.tableCellNumbers,
        Cell: currencyCell,
    }, {
        Header: 'Exchange',
        accessor: 'in.exchange',
    }]
}, {
    Header: 'Out',
    columns: [{
        Header: 'Amount',
        accessor: 'out',
        className: style.tableCellNumbers,
        Cell: currencyCell,
    }, {
        Header: 'Exchange',
        accessor: 'out.exchange',
    }]
}, {
    Header: 'Fee',
    columns: [{
        accessor: 'fee',
        width: 85,
        className: style.tableCellNumbers,
        Cell: currencyCell
    }]
},]

export default columnsSettings