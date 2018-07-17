import React from 'react'
import StylePercent from 'common/utils/StylePercent'
import style from './BalanceTablePane.module.css'
import CurrencyCell from './CurrencyCell'
import { padDecimal } from 'common/utils/padNumber';

const columnSettings = [{
    Header: 'Currency',
    accessor: 'currency',
    Cell: props => <CurrencyCell {...props}/>
}, {
    Header: 'Amount',
    accessor: 'amount',
    className: style.tableCellNumbers,
    Cell: props => padDecimal(props.value, 4)
}, {
    Header: 'Value',
    accessor: 'value',
    className: style.tableCellNumbers,
    Cell: props => padDecimal(props.value, 2)
}, {
    Header: 'Price',
    accessor: 'price',
    className: style.tableCellNumbers,
    Cell: props => padDecimal(props.value, 2)
}, {
    Header: 'Trend',
    accessor: 'trend',
    className: style.tableCellNumbers,
    Cell: props => <StylePercent style={{ textAlign: "right" }} value={props.value} />
}]

export default columnSettings