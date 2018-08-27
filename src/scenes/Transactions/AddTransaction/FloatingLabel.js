import React from 'react'
import PropTypes from 'prop-types'
import style from './FloatingLabel.module.css'
import { Label } from 'semantic-ui-react'

// TODO: Change from label padding to white shadow around letters

const FloatingLabel = ({ visible, label, ...props }) => (
    <Label floating basic className={`${visible ? style.visible : style.hidden}`} {...props}>{label}</Label>
)

FloatingLabel.propTypes = {
    visible: PropTypes.bool.isRequired,
    label: PropTypes.string,
}

export default FloatingLabel