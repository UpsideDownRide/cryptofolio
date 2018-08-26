import React from 'react'
import { Label } from 'semantic-ui-react'

export const ErrorLabel = ({ children, ...props }) => (
    <Label style={{marginTop: "-3em", position: "absolute"}} color='red' pointing='below' {...props} >{children}</Label>
)

export default ErrorLabel