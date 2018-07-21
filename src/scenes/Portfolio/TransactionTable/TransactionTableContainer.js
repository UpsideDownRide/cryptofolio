import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TransactionTablePane from './TransactionTablePane'


export class TransactionTableContainer extends Component {
    static propTypes = {
        //prop: PropTypes
    }


    render() {
        return (
            <React.Fragment>
                <TransactionTablePane {...this.props}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return {
    data: store.transactions.data,
    columnSettings: store.transactions.settings
}}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTableContainer)

