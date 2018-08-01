import React from 'react'
import Table from 'components/Table/Table'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'


const BalanceTablePane = (props) => (
    <Segment style={{ padding:0 }}>
        <Table data={props.data} columns={balanceSettings} />
    </Segment>
)

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

export default BalanceTablePane