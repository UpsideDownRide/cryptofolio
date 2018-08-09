import React from 'react'
import { TextPane } from './TextPane';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getFirstTransactionDate, getLastTransactionDate } from 'common/selectors/TransactionsSelectors'
import moment from 'moment'

export const FirstTrade = ({date, dateAgo, ...props}) => (
    <TextPane title="Date of first transaction"
        topRight=" "
        botLeft={date}
        botRight={dateAgo}
        {...props}
    />
)

export const LastTrade = ({date, dateAgo, ...props}) => (
    <TextPane title="Date of last transaction"
        topRight=" "
        botLeft={date}
        botRight={dateAgo}
        {...props}
    />
)

const daysAgo = (date) => {
    const numDays = moment().diff(moment.unix(date), 'days')
    const dayString = numDays === 1 ? 'day' : 'days'
    return `${numDays} ${dayString} ago`
}

const formatDate = date => moment.unix(date).format("DD MMM YYYY")

const getFormattedFirstDate = createSelector(
    getFirstTransactionDate,
    formatDate
)

const getFormattedFirstAgo = createSelector(
    getFirstTransactionDate,
    date => daysAgo(date)
)


const getFormattedLastDate = createSelector(
    getLastTransactionDate,
    formatDate
)

const getFormattedLastAgo = createSelector(
    getLastTransactionDate,
    date => daysAgo(date)
)

const mapStateToPropsFirst = (state) => ({
    date: getFormattedFirstDate(state),
    dateAgo: getFormattedFirstAgo(state)
})

const mapStateToPropsLast = (state) => ({
    date: getFormattedLastDate(state),
    dateAgo: getFormattedLastAgo(state)
})

export const FirstTradePane = connect(mapStateToPropsFirst)(FirstTrade)
export const LastTradePane = connect(mapStateToPropsLast)(LastTrade)


