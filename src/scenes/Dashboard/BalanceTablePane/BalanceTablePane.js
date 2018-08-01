import React from 'react'
import Table from 'components/Table/Table'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'
import { connect } from 'react-redux'
import { balanceTableData } from './BalanceTableSelector'

const BalanceTablePane = ({data, ...props}) => (
    <Segment style={{ padding:0 }}>
        <Table data={data} columns={balanceSettings} />
    </Segment>
)

const mapStateToProps = (state) => ({
    data: balanceTableData(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTablePane)

BalanceTablePane.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        trend: PropTypes.number.isRequired,
    })
    )
}


