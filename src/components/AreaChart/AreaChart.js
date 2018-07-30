import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import style from './ToolTip.module.css'
import _ from 'lodash'

const BitcoinChart = (props) => {
    const {ticks, domain} = calculateTicks(props.data)
    return (
        <ResponsiveContainer height={200}>
            <AreaChart data={props.data}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                fontSize="75%" fontWeight={700}>
                <XAxis dataKey="name"
                    tickMargin={8}
                    tickLine={{ strokeWidth: 0.5 }}
                    tickSize={3} 
                />
                <YAxis interval="preserveEnd"
                    axisLine={false}
                    minTickGap={2}
                    tickMargin={5}
                    tickLine={false}
                    tickSize={3}
                    ticks={ticks}
                    domain={domain}
                    tickFormatter={formatNumbers} 
                />
                <CartesianGrid strokeWidth={0.75} vertical={false} stroke="#eee" />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ strokeWidth: 0.75 }}
                    animationEasing="ease-in-out"
                    isAnimationActive={false}
                />
                <Area type="linear" dataKey="close"
                    stroke="#8884d8"
                    fillOpacity={0.5}
                    fill="#8884d8"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

const formatNumbers = (tick) => tick !== 0 ? tick / 1000 + "k" : ""
const getThousands = (num) => Math.floor(num/1000)*1000
const calculateTicks = (data) => {
    const [min, max] = [getThousands(_.minBy(data, 'close').close), getThousands(_.maxBy(data, 'close').close)]
    return {ticks: _.range(min, max + 501, 500), domain: [min, max+500]}
}

const CustomTooltip = (props) => {
    const { active } = props
    if (active) {
        const { payload, label } = props
        const data = payload[0].payload
        const renderData = [
            { name: 'Open', data: data.open },
            { name: 'High', data: data.high },
            { name: 'Low', data: data.low },
            { name: 'Close', data: data.close },
        ]
        return (
            <div className={style.tooltip}>
                <div className={style.tooltipLabel}>{label}</div>
                {renderData.map(el => <CustomTooltipData {...el} />)}
            </div>
        )
    }
    return null
}

const CustomTooltipData = (props) => (
    <div className={style.tooltipData}>
        <span className={style.tooltipName}>{props.name}</span>
        <span className={style.tooltipNumbers}>{props.data}</span>
    </div>
)
export default BitcoinChart