import React from 'react'
import style from './Portfolio.module.css'
import TransactionTablePane from './TransactionTablePane'
import data from 'common/mockData/transactionTable'


export default () => (
    <div className={style.body}>
        <TransactionTablePane data={data}>Table with history</TransactionTablePane>
    </div>
)