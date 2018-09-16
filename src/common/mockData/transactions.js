import { key } from 'firebase-key'
const data = [{
    key: key(1501514688000),
    date: 1501514688000,
    operation: 'Deposit',
    in: { exchange: 'Kraken', currency: 'USD', value: 5000 },
}, { 
    key: key(1501515589000),
    date: 1501515589000,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'ETH', value: 10 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2000 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'Bought first ETH'
}, {
    key: key(1501515711000),
    date: 1501515711000,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'BTC', value: 1 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2990 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'Bought first BTC'
}, {
    key: key(1537126789000),
    date: 1537126789000,
    operation: 'Transfer',
    in: { exchange: 'Coinbase', currency: 'BTC', value: 0.5 },
    out: { exchange: 'Kraken', currency: 'BTC', value: 0.5 },
},

]

1537126789

export default data