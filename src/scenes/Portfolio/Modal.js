import React from 'react'
import { Modal } from 'semantic-ui-react'

import AddTransactionForm from './AddTransaction/AddTransactionContainer'

const AddTransactionModal = (props) => (
    <Modal size="tiny" trigger={props.trigger}>
        <Modal.Header style={{ textAlign: "center", backgroundColor: "rgb(0, 0, 0, 0.05", color: "rgb(0, 0, 0, 0.87)" }}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <AddTransactionForm />
        </Modal.Content>
    </Modal>
)

export default AddTransactionModal