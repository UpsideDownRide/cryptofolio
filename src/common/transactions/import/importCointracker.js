import csvParse from 'common/utils/csvParse'
import moment from 'moment'
import { isEqual, pickBy, identity } from 'lodash/fp'

const CT_HEADER = ["Type", "Buy", "Cur.", "Sell", "Cur.", "Fee", "Cur.", "Exchange", "Group", "Comment", "Date"]
const correctCointracking = arr => isEqual(arr, CT_HEADER)
const parseRow = (exchange, currency, value) => {
    return !(currency && value) ? null : { exchange: exchange, currency: currency, value: Number(value)}
}

// TODO: merge appropriate deposit+withdrawal into transfer operation
const parseCointracking = transactions => transactions.map(row => {
    const date = moment(row[10], "YYYY-MM-DD HH:mm:ss").unix()
    const exchange = row[7]
    const result =  {
        date: date,
        operation: row[0],
        in: parseRow(exchange, row[2], row[1]),
        out: parseRow(exchange, row[4], row[3]),
        fee: parseRow(exchange, row[6], row[5]),
        comment: `${row[9]} CT import`,
    }
    return pickBy(identity, result)
})


const importCoinTracker = (file) => {
    return csvParse(file)
        .then(result => {
            const { data, errors } = result
            const [header, ...transactions] = data
            if (!correctCointracking(header)) throw new Error('Header does not match with Cointracker template')
            return { transactions: parseCointracking(transactions), errors: errors }
        })
        .catch(error => error)
}

export default importCoinTracker