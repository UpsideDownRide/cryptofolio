import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BalanceTablePane from './BalanceTablePane'


export class BalanceTableContainer extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <React.Fragment>
                <BalanceTablePane {...this.props}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => ({
    data: store.balanceData,
    columnSettings: store.balanceTableColumnSettings
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTableContainer)

