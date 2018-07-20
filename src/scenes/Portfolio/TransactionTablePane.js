import React from 'react'
import Table from 'components/Table/Table'
//import PropTypes from 'prop-types'

const TransactionTable = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            <Table data={props.data} columns={props.columnSettings} />
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