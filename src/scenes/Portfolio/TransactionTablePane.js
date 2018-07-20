import React from 'react'
//import StylePercent from 'common/utils/StylePercent'
import Table from 'components/Table/Table'
//import PropTypes from 'prop-types'
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
    Header: 'Operation',
    accessor: 'operation',
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
}, {
    Header: 'Exchange',
    accessor: 'exchange',
    className: style.tableCellNumbers,
}]

const TransactionTable = (props) => {
    return (
        <React.Fragment>
            <Table data={props.data} columns={columnsSettings} />
        </React.Fragment>
    )
}

// TransactionTable.PropTypes = {
//     name: PropTypes.string,
//     data: PropTypes.arrayOf({
//         currency: PropTypes.string.isRequired,
//         amount: PropTypes.number.isRequired,
//         value: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//         trend: PropTypes.number.isRequired,
//     })
// }

export default TransactionTable