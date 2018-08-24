import React from 'react'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'
import tooltipStyle from '../ToolTip.module.css'
import _ from 'lodash'
import treemapStyle from './TreeMap.module.css'

const COLORS = ['cadetblue', '#bebada', '#fb8072', '#80b1d3', '#b3de69', '#fccde5', '#d9d9d9']
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

const TreeMap = (props) => (
    <ResponsiveContainer width={"100%"} height={200}>
        <Treemap
            data={props.data}
            dataKey="size"
            ratio={GOLDEN_RATIO}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="ease-in"
        >
            <Tooltip
                content={<CustomTooltip data={props.data} />}
                cursor={{ strokeWidth: 0.75 }}
                isAnimationActive={false}
            />
        </Treemap>
    </ResponsiveContainer>
)

const CustomizedContent = ({ root, depth, x, y, width, height, index, colors, name, ...props }) => (
    <g className={["recharts-treemap-content", treemapStyle.content].join(' ')}>
        <defs>
            <filter id="saturate-filter">
                <feColorMatrix type="saturate" values="3" />
            </filter>
        </defs>
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
                    letterSpacing="0.1em"
                >
                    {name}
                </text>
                : null
        }
    </g>
)

const CustomTooltip = ({ active, payload, data, ...props }) => {
    if (active) {
        const label = payload[0].payload.name
        const value = _.round(payload[0].value, 4)
        const total = _(data).reduce((res, el) => res + el.size, 0)
        const percentShare = `${_.round(value * 100 / total, 2)} %`
        const renderData = [{ name: 'Value', data: value },
        { name: 'Share', data: percentShare }]
        return (
            <div className={tooltipStyle.tooltip}>
                <div className={tooltipStyle.tooltipLabel}>{label}</div>
                {renderData.map((el, i) => <CustomTooltipData key={i} {...el} {...props} />)}
            </div>
        )
    }
    return null
}

const CustomTooltipData = ({ name, data }) => (
    <div className={tooltipStyle.tooltipData}>
        <span className={tooltipStyle.tooltipName}>{name}</span>
        <span className={tooltipStyle.tooltipNumbers}>{data}</span>
    </div>
)

export default TreeMap
