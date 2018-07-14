import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import style from './Table.module.css'

const stylePercent = props => {
    const number = props.value
    const numColor = number > 0 ? "green" : "red"
    const styled = (Math.round(number*1000)/10)+"%"
    return (
        <span style={{color: numColor}}>
            {styled}
        </span>
    )
}

const table = () => {
    console.log(style.right)
    const row = {
        currency: 'BTC',
        amount: 121,
        value: 5250,
        price: 43.3889765,
        trend: -0.085
    }
    const data = Array(20).fill().map(el => {
        return {
        currency: 'BTC',
        amount: Math.round(Math.random()*100),
        value: Math.round(Math.random()*100000)/100,
        price: Math.round(Math.random()*10000)/100,
        trend: Math.round((Math.random()-0.5)*200)/1000
    }})

    const columns = [{
        Header: 'Currency',
        accessor: 'currency', // String-based value accessors!
        Cell: props => <span className={style.currency}><div className={style.cryptoIcon}><i className="crypto-icon-18 crypto-icon-color crypto-icon-color-btc"></i></div><p>{props.value}</p></span>
    }, {
        Header: 'Amount',
        accessor: 'amount',
        className: style.right
    }, {
        Header: 'Value',
        accessor: 'value',
        className: style.right,
    }, {
        Header: 'Price',
        accessor: 'price',
        className: style.right,
    }, {
        Header: 'Trend',
        accessor: 'trend',
        className: style.right,
        Cell: stylePercent
    }]
    return (
        <ReactTable
            data={data}
            columns={columns}
            className={[style.table, '-striped', '-highlight'].join(' ')}
            showPagination={false}
        />
    )
}

export default table

