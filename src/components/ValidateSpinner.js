import React from 'react'
import PropTypes from 'prop-types'
import style from './ValidateSpinner.module.css'
import { Loader } from 'semantic-ui-react'

const ValidateSpinner = ({ visible, children }) => (
    <div style={{ position: "relative" }}>
        {children}
        {visible ? <Loader className={style.loader} active size='tiny' /> : <div />}
    </div>
)

ValidateSpinner.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default ValidateSpinner