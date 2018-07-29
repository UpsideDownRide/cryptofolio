import React from 'react'
import ReactTable from "react-table";
//import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import style from './Table.module.css'

const Table = (props) => {
    return (
        <ReactTable
            data={props.data}
            columns={props.columns}
            className={[style.table, '-striped', '-highlight'].join(' ')}
            showPagination={true}
        />
    )
}

export default Table