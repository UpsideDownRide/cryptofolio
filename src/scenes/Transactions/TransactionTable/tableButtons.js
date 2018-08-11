import React from 'react'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import style from './TransactionTablePane.module.css'
import { deleteTransaction } from 'common/transactions/transactionsActions'
import { Icon } from 'semantic-ui-react'

const actionCell = ({ isLoggedIn, original, deleteTrans }) => (
    <Icon
        className={style.clickableIcon}
        name="trash alternate"
        onClick={() => deleteTrans(isLoggedIn, original.key)}
    />
)

const mapStateToActionProps = state => ({
    isLoggedIn: isUserLoggedIn(state)
})

const mapDispatchToActionProps = dispatch => ({
    deleteTrans: (isLoggedIn, key) => dispatch(deleteTransaction(isLoggedIn, key)) 
})

export const ActionCell = connect(mapStateToActionProps, mapDispatchToActionProps)(actionCell)