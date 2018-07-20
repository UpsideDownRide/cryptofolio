import React from 'react'
import style from './TransactionTablePane.module.css'
import CurrencyIcon from 'common/utils/CurrencyIcon';
import { padDecimal } from 'common/utils/padNumber';

const currencyCell = props => {
    return (
        <React.Fragment>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
                <p>{padDecimal(props.value.value, 2)}</p>
                <div style={{ margin: "2.5px 0 0 0.5em" }}><CurrencyIcon name={props.value.currency} /></div>
            </span>
        </React.Fragment>
    )
}

const columnsSettings = [{
    Header: 'Date',
    accessor: 'date',
}, {
    Header: 'Operation',
    accessor: 'operation',
}, {
    Header: 'Exchange',
    accessor: 'exchange',
}, {
    Header: 'In',
    accessor: 'in',
    className: style.tableCellNumbers,
    Cell: currencyCell,
}, {
    Header: 'Out',
    accessor: 'out',
    className: style.tableCellNumbers,
    Cell: currencyCell,
}, {
    Header: 'Fee',
    accessor: 'fee',
    className: style.tableCellNumbers
}, ]

export default columnsSettings