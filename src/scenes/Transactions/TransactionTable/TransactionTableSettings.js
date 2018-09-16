import React from 'react'
import style from './TransactionTablePane.module.css'
import CurrencyIcon from 'common/utils/CurrencyIcon'
import { padDecimal } from 'common/utils/padNumber'
import dayjs from 'dayjs'
import { isEqual, get } from 'lodash/fp'
import { ActionCell } from './tableButtons'

const currencyCell = props => {
    if (!props.value) return null
    else return (
        <div>
            <span>{padDecimal(props.value.value, 2)}
                <CurrencyIcon style={{ margin: "0.15em 0 0 0.8em" }} name={props.value.currency} />
            </span>
            <MinorSpan>{props.value.currency}</MinorSpan>
        </div >
    )
}

const timeCell = ({ value }) => {
    const momentDate = dayjs(value)
    const date = momentDate.format('D MMMM YY')
    const time = momentDate.format('HH:mm:ss')
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <span>{date}</span>
            <MinorSpan>{time}</MinorSpan>
        </div>
    )
}

const exchangeCell = ({ original }) => {
    const sameExchanges = isEqual(get('in.exchange', original), get('out.exchange', original))
    return (
        <div>
            <span>{original.out && original.out.exchange}</span>
            <span>{original.in && original.out && !sameExchanges && ' -> '}</span>
            <span>{original.in && !sameExchanges && original.in.exchange}</span>
        </div>
    )
}

const MinorSpan = props => (
    <span style={{ color: "#aaa", fontSize: "0.7em", width: "100%", textAlign: "center" }}>
        {props.children}
    </span>
)

export const columnsSettings = [{
    accessor: 'buttons',
    Cell: (props) => <ActionCell {...props} />,
    width: 35
}, {
    Header: 'Date',
    accessor: 'date',
    Cell: timeCell,
}, {
    Header: 'Operation',
    accessor: 'operation',
}, {
    Header: 'Exchange',
    accessor: 'exchange',
    Cell: exchangeCell,
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
    className: style.tableCellNumbers,
    Cell: currencyCell
}, {
    Header: 'Comment',
    accessor: 'comment',
},
]

export const defaultSorting = [{
    id: 'date',
    desc: true
}]