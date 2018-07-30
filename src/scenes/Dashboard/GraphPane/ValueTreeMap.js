import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'

const ValueTreeMap = (props) => (
    <GraphPane chart="treeMap" {...this.props} />
)

const mapStateToProps = (state) => ({
    data: state.balance.data
        .map(el => ({ name: el.currency, size: el.value }))
        .sort((a, b) => b.size - a.size)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ValueTreeMap)
