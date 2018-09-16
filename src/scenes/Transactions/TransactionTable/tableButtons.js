import React from 'react'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import style from './TransactionTablePane.module.css'
import { deleteTransaction } from 'common/transactions/transactionsActions'
import { Icon, Confirm } from 'semantic-ui-react'
import { getUserUID } from 'common/user/userSelectors';


class actionCell extends React.Component {
    state = { confirmOpen: false }
    showConfirm = () => this.setState({ confirmOpen: true })
    handleCancel = () => this.setState({ confirmOpen: false })
    handleConfirm = () => {
        this.props.deleteTrans(this.props.original.key, this.props.isLoggedIn, this.props.uuid)
        this.setState({ confirmOpen: false })
    }

    render() {
        return (
            <React.Fragment>
                <Icon
                    className={style.clickableIcon}
                    name="trash alternate"
                    onClick={this.showConfirm}
                />
                <Confirm open={this.state.confirmOpen} onConfirm={this.handleConfirm} onCancel={this.handleCancel} />
            </React.Fragment>
        )
    }
}

const mapStateToActionProps = state => ({
    uuid: getUserUID(state),
    isLoggedIn: isUserLoggedIn(state)
})

const mapDispatchToActionProps = dispatch => ({
    deleteTrans: (key, isLoggedIn, uuid) => dispatch(deleteTransaction(key, isLoggedIn, uuid))
})

export const ActionCell = connect(mapStateToActionProps, mapDispatchToActionProps)(actionCell)