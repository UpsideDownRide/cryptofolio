import React from 'react'
import { Label } from 'semantic-ui-react'

export const ErrorLabel = ({ children, ...props }) => (
    <Label color='red' pointing='below' {...props} >{children}</Label>
)

export default ErrorLabel