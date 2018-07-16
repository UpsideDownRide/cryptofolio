import { randomNumber as random, goodRound } from 'common/utils/random'
import { randomSymbol } from './currencies'
import { randomElement } from 'common/utils/random';

const OPERATIONS = ["Trade", "Withdraw", "Deposit", "Exchange", "Mining"]
const EXCHANGES = ["Binance", "Coinbase", "GDAX"]

const data = Array(20).fill().map(el => {
    return {
        operation: randomElement(OPERATIONS),
        in: { value: random(0, 100, 2), currency: randomSymbol() },
        out: { value: random(0, 100, 2), currency: randomSymbol() },
        fee: random(0, 1, 2),
        exchange: randomElement(EXCHANGES)
    }
})

export default data