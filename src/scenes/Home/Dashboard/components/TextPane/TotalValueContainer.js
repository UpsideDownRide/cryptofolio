import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class TotalValueContainer extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <React.Fragment>
                <TextPane primary={this.props.totalValue}/>
            </React.Fragment>
        )
    }
}

const sum = (a, b) => a+b

const mapStateToProps = (state) => ({
    totalValue: state.balanceData.value.map(sum)    
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValueContainer)
