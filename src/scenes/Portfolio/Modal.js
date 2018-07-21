import React from 'react'
import { Modal } from 'semantic-ui-react'

import AddTransactionForm from './AddTransaction/finalform'

const AddTransactionModal = (props) => (
    <Modal size="small" trigger={props.trigger}>
        <Modal.Header style={{ backgroundColor: "#21BA45", color: "#FFFFFF" }}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <AddTransactionForm subscription={{ submitting: true, pristine: true }}/>
        </Modal.Content>
    </Modal>
)

export default AddTransactionModal