import React from 'react'
import ReactTable from "react-table";
import PropTypes from 'prop-types'
import 'react-table/react-table.css'

const Table = ({ data, columns, className, ...props }) => (
    <ReactTable
        data={data}
        columns={columns}
        minRows={0}
        className={[className, '-striped', '-highlight'].join(' ')}
        NoDataComponent={React.Fragment}
        noDataText=''
        {...props}
    />
)

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array,
    className: PropTypes.string,
}


export default Table