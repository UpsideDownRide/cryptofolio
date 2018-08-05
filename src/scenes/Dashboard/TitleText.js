import React from 'react'
import style from './TitleText.module.css'

export default (props) => (
    <div className={style.title}>
        <span className={style.titlename}>{props.text}</span>
    </div>
)
