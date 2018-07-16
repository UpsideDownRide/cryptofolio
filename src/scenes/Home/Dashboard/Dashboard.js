import React from 'react'
import style from './Dashboard.module.css'
import TextPane from './components/TextPane/TextPane'
import GraphPane from './components/GraphPane/GraphPane'
import BalanceTablePane from './components/BalanceTablePane/BalanceTablePane'

import balanceData from 'common/mockData/balanceTable'

const Dashboard = () => {
    return (
        <div className={style.body}>
            <div className={style.textPanes}>
                <TextPane 
                    title="Total value of coins:"
                    value={123} currency="GBP"
                    percentChange={0.021}
                    cryptoValue={0.28}
                    cryptoCurrency="ETH"
                />
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
                <TextPane />
            </div>
            <div className={style.graphPanes}>
                <GraphPane chart='treeMap'/>
                <GraphPane chart='treeMap'/>
                <GraphPane chart='area'/>
                <GraphPane chart='area'/>
                <BalanceTablePane data={balanceData}/>
            </div>
        </div>
    )
}

export default Dashboard
