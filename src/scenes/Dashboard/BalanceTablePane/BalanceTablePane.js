import React from 'react'
import Table from 'components/Table/Table'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'
import { connect } from 'react-redux'
import { balanceTableData } from 'common/selectors/BalancesSelectors'
import TitleText from '../TitleText'

// TODO: Reactive design for mobile - current table is not good for narrow screens, should probably design different layout for them

const BalanceTablePane = ({data, ...props}) => (
    <Segment>
        <TitleText text='Total balances by currency' />
        <Table data={data}
            columns={balanceSettings}
            showPagination={false}
            {...props} />
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


