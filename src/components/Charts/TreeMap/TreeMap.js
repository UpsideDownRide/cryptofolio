import React from 'react'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'
import style from '../ToolTip.module.css'
import _ from 'lodash'
import moment from 'moment'

const COLORS = ['cadetblue', '#bebada', '#fb8072', '#80b1d3', '#b3de69', '#fccde5', '#d9d9d9']

const TreeMap = (props) => (
    <ResponsiveContainer width={"100%"} height={200}>
        <Treemap
            data={props.data}
            dataKey="size"
            ratio={(1 + Math.sqrt(5)) / 2}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
            isAnimationActive={false}
            animationDuration={600}
            animationEasing="ease-in"
        >
            <Tooltip
                content={<CustomTooltip />}
                cursor={{ strokeWidth: 0.75 }}
                isAnimationActive={false}
            />
        </Treemap>
    </ResponsiveContainer>
)

const CustomizedContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
    return (
        <g className="recharts-treemap-content">
            <rect
                x={x}
                y={y}
                rx="2.5"
                ry="2.5"
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : "rgb(0, 0, 0, 0)",
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {
                depth === 1 ?
                    <text
                        x={x + width / 2}
                        y={y + height / 2 + 7}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="1em"
                        fontVariant="small-caps"
                    >
                        {name}
                    </text>
                    : null
            }
        </g>
    )
}

const CustomTooltip = (props) => {
    const { active } = props
    if (active) {
        const { payload, label } = props
        const date = moment.unix(label).format('ddd - DD MMM')
        const data = payload[0].payload
        const renderData = [
            { name: 'Open', data: data.open },
            { name: 'High', data: data.high },
            { name: 'Low', data: data.low },
            { name: 'Close', data: data.close },
        ]
        return (
            <div className={style.tooltip}>
                <div className={style.tooltipLabel}>{date}</div>
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

export default TreeMap
