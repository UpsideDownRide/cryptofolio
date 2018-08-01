import { map, get } from 'lodash'
import { getCoinBalances } from '../../Transactions/TransactionsSelectors'
import { getAllTickers } from 'common/cryptoPrices/tickersSelector'
import { createSelector } from 'reselect'

export const balanceTableData = createSelector(
    getAllTickers,
    getCoinBalances,
    (tickers, coinBalances) => map(coinBalances, (val, key) => ({ currency: key, amount: val, price: get(tickers, key, 0), trend: 0, value: get(tickers, key, 0) * val }))
)