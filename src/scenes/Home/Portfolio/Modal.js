import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'

import AddTransactionForm from './AddTransactionForm'


class ModalModalExample extends React.Component {

    render() {
        return <Modal trigger={<Button positive><Icon name='plus' />Add Transaction</Button>}>
            <Modal.Header style={{ backgroundColor: "#21BA45", color: "#FFFFFF" }}>Add a new transaction</Modal.Header>
            <Modal.Content>
                <AddTransactionForm/>
                <Button positive>Add</Button>
            </Modal.Content>
        </Modal>

    }
}

export default ModalModalExample