import React from 'react'
import PropTypes from 'prop-types'
import style from "./PasswordEye.module.css";
import { Icon } from 'semantic-ui-react'

const PasswordEye = ({ children, handleOnClick, visiblePassword }) => (
    <div style={{ position: "relative" }}>
        {children}
        <Icon
            name={visiblePassword ? "eye slash" : "eye"}
            onClick={handleOnClick}
            style={{color: visiblePassword ? "rgba(0,0,0,0.87)" : "rgba(212,212,212,0.87)"}}
            className={style.icon}
        />
    </div>
)

PasswordEye.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    visiblePassword: PropTypes.bool.isRequired,
}

export default PasswordEye