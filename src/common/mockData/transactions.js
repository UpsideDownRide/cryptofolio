const data = [{
    date: '2017-07-31T15:24:48.000Z',
    operation: 'Deposit',
    in: { exchange: 'Kraken', currency: 'USD', value: 5000 },
}, { date: '2018-07-31T15:39:49.000Z',
    operation: 'Buy',
    in: { exchange: 'Kraken', currency: 'ETH', value: 10 },
    out: { currency: 'USD', value: 2000 },
    fee: { currency: 'USD', value: 5 },
    comment: 'First coins wooohooo!'
}, { date: '2018-07-31T15:41:51.000Z',
    operation: 'Buy',
    in: { exchange: 'Kraken', currency: 'BTC', value: 1 },
    out: { currency: 'USD', value: 2990 },
    fee: { currency: 'USD', value: 5 },
    comment: 'BTC BTC BTC!!'
},
]

export default data