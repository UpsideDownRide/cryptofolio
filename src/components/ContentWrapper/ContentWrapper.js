import React from 'react'
import { content } from './ContentWrapper.module.css'

export default ({ children }) => (
    <div className={content}>
        {children}
    </div>
)

