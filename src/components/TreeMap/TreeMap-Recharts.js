import React from 'react'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'



const data = [
    { name: 'BTC', size: 5000 },
    { name: 'ETH', size: 3000 },
    { name: 'ADA', size: 2000 },
    { name: 'AMB', size: 1000 },
    { name: 'DOGE', size: 1000 },
];

const COLORS = ['cadetblue', '#bebada', '#fb8072', '#80b1d3', '#b3de69', '#fccde5', '#d9d9d9'];

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
                        fontSize={14}
                    >
                        {name}
                    </text>
                    : null
            }
        </g>
    );
};

class SimpleTreemap extends React.Component {
    render() {
        return (
            <ResponsiveContainer width={"100%"} height={200}>
                <Treemap
                    width={300}
                    height={200}
                    data={data}
                    dataKey="size"
                    ratio={(1 + Math.sqrt(5)) / 2}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent colors={COLORS} />}
                    isAnimationActive={false}
                    animationDuration={600}
                    animationEasing="ease-in"
                >
                </Treemap>
            </ResponsiveContainer>
        )
    }
}

export default SimpleTreemap
