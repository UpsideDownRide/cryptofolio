import { randomNumber as random } from 'common/utils/random'
import { randomSymbol } from './currencies'
import { randomElement } from 'common/utils/random';
import moment from 'moment'

const OPERATIONS = ["Trade", "Withdraw", "Deposit", "Exchange", "Mining"]
const EXCHANGES = ["Binance", "Coinbase", "GDAX"]

const data = Array(10).fill().map(el => {
    return {
        date: moment().toISOString(),
        operation: randomElement(OPERATIONS),
        in: { value: random(0, 100, 2), currency: randomSymbol(), exchange: randomElement(EXCHANGES) },
        out: { value: random(0, 100, 2), currency: randomSymbol(), exchange: randomElement(EXCHANGES) },
        fee: { value: random(0, 1, 2), currency: randomSymbol() },
    }
})

export default data