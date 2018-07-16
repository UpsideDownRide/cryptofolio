const data = Array(20).fill().map(el => {
    return {
    currency: 'BTC',
    amount: Math.round(Math.random()*100),
    value: Math.round(Math.random()*100000)/100,
    price: Math.round(Math.random()*10000)/100,
    trend: Math.round((Math.random()-0.5)*2000)/10000
}})

export default data