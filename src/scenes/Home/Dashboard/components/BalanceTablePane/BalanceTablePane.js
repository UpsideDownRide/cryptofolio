import React from 'react'
import StylePercent from 'common/utils/StylePercent'
import Table from 'components/Table/Table'
import PropTypes from 'prop-types'
import style from './BalanceTablePane.module.css'
import CurrencyIcon from 'common/utils/CurrencyIcon'
import { padDecimal } from '../../../../../common/utils/padNumber';

const currencyCell = (props) => {
    return (
        <span style={{ display: "flex" }}>
            <div style={{ margin: "0 12px" }}><CurrencyIcon name={props.value}/></div>
            <p>{props.value}</p>
        </span>
    )
}
const columnsSettings = [{
    Header: 'Currency',
    accessor: 'currency',
    Cell: currencyCell
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

const BalanceTablePane = (props) => {
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{props.name}</span>
            </div>
            <div className={style.content}>
                <Table data={props.data} columns={columnsSettings} />
            </div>
        </div>
    )
}

BalanceTablePane.propTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        trend: PropTypes.number.isRequired,
    })
    )
}

export default BalanceTablePane