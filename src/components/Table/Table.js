import React from 'react'
import ReactTable from "react-table";
import PropTypes from 'prop-types'
import 'react-table/react-table.css'

const Table = ({ data, columns, className, showPagination, ...props }) => (
    <ReactTable
        data={data}
        columns={columns}
        className={[className, '-striped', '-highlight'].join(' ')}
        showPagination={showPagination || true}
        {...props}
    />
)

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array,
    className: PropTypes.string,
    showPagination: PropTypes.bool
}


export default Table