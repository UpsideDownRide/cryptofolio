const data = [{
    date: 1501514688,
    operation: 'Deposit',
    in: { exchange: 'Kraken', currency: 'USD', value: 5000 },
}, { date: 1533051589,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'ETH', value: 10 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2000 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'First coins wooohooo!'
}, { date: 1533051711,
    operation: 'Trade',
    in: { exchange: 'Kraken', currency: 'BTC', value: 1 },
    out: { exchange: 'Kraken', currency: 'USD', value: 2990 },
    fee: { exchange: 'Kraken', currency: 'USD', value: 5 },
    comment: 'BTC BTC BTC!!'
},
]

export default data