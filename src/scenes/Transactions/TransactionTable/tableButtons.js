import React from 'react'
import { connect } from 'react-redux'
import { isUserLoggedIn } from 'common/user/userSelectors';
import style from './TransactionTablePane.module.css'
import { deleteTransaction } from 'common/transactions/transactionsActions'
import { Icon } from 'semantic-ui-react'
import { getUserUID } from 'common/user/userSelectors';

const actionCell = ({ uuid, isLoggedIn, original, deleteTrans }) => (
    <Icon
        className={style.clickableIcon}
        name="trash alternate"
        onClick={() => deleteTrans(original.key, isLoggedIn, uuid)}
    />
)

const mapStateToActionProps = state => ({
    uuid: getUserUID(state),
    isLoggedIn: isUserLoggedIn(state)
})

const mapDispatchToActionProps = dispatch => ({
    deleteTrans: (key, isLoggedIn, uuid) => dispatch(deleteTransaction(key, isLoggedIn, uuid)) 
})

export const ActionCell = connect(mapStateToActionProps, mapDispatchToActionProps)(actionCell)