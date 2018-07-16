import React from 'react'
import ReactTable from "react-table";
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import style from './Table.module.css'

const Table = (props) => {

    return (
        <ReactTable
            data={props.data}
            columns={props.columns}
            className={[style.table, '-striped', '-highlight'].join(' ')}
            showPagination={false}
        />
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        Header: PropTypes.string.isRequired,
        accessor: PropTypes.string.isRequired,
        className: PropTypes.string,
        Cell: PropTypes.func,
        style: PropTypes.string
    }))
}

export default Table