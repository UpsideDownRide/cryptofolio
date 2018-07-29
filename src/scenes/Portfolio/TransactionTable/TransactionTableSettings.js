import React from 'react'
import style from './TransactionTablePane.module.css'
import CurrencyIcon from 'common/utils/CurrencyIcon';
import { padDecimal } from 'common/utils/padNumber';
import moment from 'moment'

const currencyCell = props => {
    if (!props.value) return null
    else return (
        <span>
            <p>{padDecimal(props.value.value, 2)}</p>
            <div style={{ margin: "2.5px 0 0 0.5em" }}>
                <CurrencyIcon name={props.value.currency} />
            </div>
        </span>
    )
}

const timeCell = props => (
    <span>
        {moment(props.value).format('LLL')}
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
        Header: 'Exchange',
        accessor: 'in.exchange',
    }, {
        Header: 'Amount',
        accessor: 'in',
        className: style.tableCellNumbers,
        Cell: currencyCell,
    }]
}, {
    Header: 'Out',
    columns: [{
        Header: 'Exchange',
        accessor: 'in.exchange',
    }, {
        Header: 'Amount',
        accessor: 'out',
        className: style.tableCellNumbers,
        Cell: currencyCell,
    }]
}, {
    Header: 'Fee',
    columns: [{
        accessor: 'fee.value',
        className: style.tableCellNumbers,
    }]
},]

export default columnsSettings