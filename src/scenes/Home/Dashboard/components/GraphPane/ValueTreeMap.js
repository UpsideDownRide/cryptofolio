import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'

export class ValueTreeMap extends Component {
    static propTypes = {
        //        prop: PropTypes
    }

    render() {
        return (
            <React.Fragment>
                <GraphPane chart="treeMap" {...this.props}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    treeMapData: state.balanceData
        .map(el => ({name: el.currency, size: el.value}))
        .sort((a, b) => b.size - a.size)
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ValueTreeMap)
