import React from 'react'
import StylePercent from 'common/utils/StylePercent'
import Table from 'components/Table/Table'
import PropTypes from 'prop-types'
import style from './BalanceTablePane.module.css'


const columnsSettings = [{
    Header: 'Currency',
    accessor: 'currency',
    Cell: props => <span style={{display: "flex"}}><div style={{margin: "0 12px"}}><i className="crypto-icon-18 crypto-icon-color crypto-icon-color-btc"></i></div><p>{props.value}</p></span>
}, {
    Header: 'Amount',
    accessor: 'amount',
    className: style.tableCellNumbers
}, {
    Header: 'Value',
    accessor: 'value',
    className: style.tableCellNumbers
}, {
    Header: 'Price',
    accessor: 'price',
    className: style.tableCellNumbers
}, {
    Header: 'Trend',
    accessor: 'trend',
    className: style.tableCellNumbers,
    Cell: props => <StylePercent style={{textAlign: "right"}} value={props.value}/>
}]

const BalanceTable = (props) => {
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{props.name}</span>
            </div>
            <div className={style.content}>
                <Table data={props.data} columns={columnsSettings}/>
            </div>
        </div>
    )
}

BalanceTable.PropTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        trend: PropTypes.number.isRequired,
    })
}

export default BalanceTable