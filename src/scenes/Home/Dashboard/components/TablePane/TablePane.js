import React from 'react'
import PropTypes from 'prop-types'
import style from './TablePane.module.css'
import Table from '../../../../../components/Table/Table'

const graphPane = (props) => {
    const name = 'Current Balance'
    return (
        <div className={style.body}>
            <div className={style.title}>
                <span className={style.titlename}>{name}</span>
            </div>
            <div className={style.content}>
                <Table/>
            </div>
        </div>
    )
}

export default graphPane
