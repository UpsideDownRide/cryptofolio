import React from 'react'
import CurrencyIcon from 'common/utils/CurrencyIcon'

export default (props) => (

    <span style={{ display: "flex" }}>
        <div style={{ margin: "0 12px" }}><CurrencyIcon name={props.value} /></div>
        <p>{props.value}</p>
    </span>

)
