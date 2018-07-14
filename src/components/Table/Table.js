import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

const table = () => {
    const data = [{
        currency: 'BTC',
        amount: 121,
        value: 5250,
        price: 43.3889765,
        trend: 0.085
    }]

    const columns = [{
        Header: 'Currency',
        accessor: 'currency' // String-based value accessors!
    }, {
        Header: 'Amount',
        accessor: 'amount',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
        Header: 'Value',
        accessor: 'value' // Custom value accessors!
    }, {
        Header: 'Price',
        accessor: 'price'
    }, {
        Header: 'Trend',
        accessor: 'trend'
    }]
    return (
        <ReactTable
            data={data}
            columns={columns}
        />
    )
}

export default table

