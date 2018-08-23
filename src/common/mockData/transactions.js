import { key } from 'firebase-key'
const data = [{
    key: key(1501514688000),
    date: 1501514688000,
    operation: 'Deposit',
    in: { exchange: 'Kraken', currency: 'USD', value: 5000 },
}, { 
    key: key(1533051589000),
    date: 1533051589000,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'ETH', value: 10 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2000 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'Bought first ETH'
}, {
    key: key(1533051711000),
    date: 1533051711000,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'BTC', value: 1 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2990 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'Bought first BTC'
},
]

export default data