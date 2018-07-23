import React from 'react'
import { Modal } from 'semantic-ui-react'

import AddTransactionForm from './AddTransaction/AddTransactionContainer'

const AddTransactionModal = (props) => (
    <Modal size="small" trigger={props.trigger}>
        <Modal.Header style={{ backgroundColor: "#21BA45", color: "#FFFFFF" }}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <AddTransactionForm />
        </Modal.Content>
    </Modal>
)

export default AddTransactionModal