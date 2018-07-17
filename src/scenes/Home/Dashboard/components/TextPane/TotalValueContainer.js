import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TotalValue } from './TextPane'

export class TotalValueContainer extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <React.Fragment>
                <TotalValue value={this.props.totalValue}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return ({
    totalValue: store.balanceData.reduce((acc, el) => acc+el.value, 0),
})}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValueContainer)
