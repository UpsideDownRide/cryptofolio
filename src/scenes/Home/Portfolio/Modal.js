import React from 'react'
import { Modal, Button, Icon, ModalActions } from 'semantic-ui-react'

import AddTransactionContainer from './AddTransactionContainer'
import FinalForm from './finalform'
import AddTransactionForm from './AddTransactionForm';

const AddTransactionModal = (props) => (
    <Modal size="small" trigger={props.trigger}>
        <Modal.Header style={{ backgroundColor: "#21BA45", color: "#FFFFFF" }}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <FinalForm />
        </Modal.Content>
    </Modal>
)

export default AddTransactionModal