import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const formatNumbers = (tick) => tick !== 0 ? tick/1000 + "k" : ""

const CustomTooltip = (props) => {
    const { active } = props
    if (active) {
        const { payload, label } = props
        return (
            <div className="custom-tooltip">
                <p>HA!</p>
            </div>
        )
    }
    return null
}

const areaChart = (props) => {
    return (
        <ResponsiveContainer height={200}>
            <AreaChart data={props.data}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                fontSize="75%" fontWeight={700}>
                <XAxis dataKey="name"
                    tickMargin={8}
                    tickLine={{strokeWidth: 0.5}}
                    tickSize={3}/>
                <YAxis interval="preserveEnd"
                    axisLine={false}
                    minTickGap={2}
                    tickMargin={5}
                    tickLine={false}
                    tickSize={3}
                    tickFormatter={formatNumbers}/>
                <CartesianGrid strokeWidth={0.75} vertical={false} stroke="#eee"/>
                <Tooltip content={<CustomTooltip/>} cursor={{ strokeWidth: 0.75 }} coordinate={{x:0, y:0}} animationEasing="ease-in-out"/>
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={0.5} fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={0.5} fill="cadetblue" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default areaChart