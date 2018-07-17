import { randomNumber as random, randomElement }  from 'common/utils/random'
import goodRound from 'common/utils/round'
import { SYMBOLS } from './currencies';

const data = Array(20).fill().map(el => {
    const amount = random(1, 100, 4)
    const price = random(0, 100, 2)
    return {
    currency: randomElement(SYMBOLS),
    amount: amount,
    value: goodRound(amount*price, 2),
    price: price,
    trend: random(-0.1, 0.1, 4)
}})

export default data