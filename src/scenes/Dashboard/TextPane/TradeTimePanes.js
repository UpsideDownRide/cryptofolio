import React from 'react'
import { TextPane } from './TextPane';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getTransactions } from 'common/selectors/TransactionsSelectors'
import { minBy, maxBy, get, flow } from 'lodash'
import moment from 'moment'

export const FirstTrade = ({date, dateAgo, ...props}) => (
    <TextPane title="Date of first transaction:"
        topRight=" "
        botLeft={date}
        botRight={dateAgo}
        {...props}
    />
)

export const LastTrade = ({date, dateAgo, ...props}) => (
    <TextPane title="Date of last transaction:"
        topRight=" "
        botLeft={date}
        botRight={dateAgo}
        {...props}
    />
)

const daysAgo = (date) => {
    const numDays = moment().diff(moment(date), 'days')
    const dayString = numDays === 1 ? 'day' : 'days'
    return `${numDays} ${dayString} ago`
}

const getFirstTransaction = createSelector(
    getTransactions,
    transactions => flow(
        arr => minBy(arr, o => o.date),
        obj => get(obj, 'date')
    )(transactions)
)

const getFormattedFirstDate = createSelector(
    getFirstTransaction,
    date => moment(date).format("DD MMM YYYY")
)

const getFormattedFirstAgo = createSelector(
    getFirstTransaction,
    date => daysAgo(date)
)

const getLastTransaction = createSelector(
    getTransactions,
    transactions => flow(
        arr => maxBy(arr, o => o.date),
        obj => get(obj, 'date')
    )(transactions)
)

const getFormattedLastDate = createSelector(
    getLastTransaction,
    date => moment(date).format("DD MMM YYYY")
)

const getFormattedLastAgo = createSelector(
    getLastTransaction,
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


