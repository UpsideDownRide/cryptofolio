import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from 'components/Table/Table'
export class TransactionTableContainer extends Component {
    static propTypes = {
        //prop: PropTypes
    }

    render() {
        return (
            <Table {...this.props} />
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.transactions.data,
        columns: store.transactions.settings
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTableContainer)

