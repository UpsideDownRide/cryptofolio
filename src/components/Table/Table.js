import React from 'react'
import ReactTable from "react-table";
//import PropTypes from 'prop-types'
import 'react-table/react-table.css'

const Table = (props) => {
    return (
        <ReactTable
            data={props.data}
            columns={props.columns}
            className={[props.className, '-striped', '-highlight'].join(' ')}
            showPagination={true}
        />
    )
}

export default Table