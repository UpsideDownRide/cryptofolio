import React from 'react'
import { Modal } from 'semantic-ui-react'

import AddTransactionForm from './AddTransaction/AddTransactionContainer'

class AddTransactionModal extends React.Component {
    state = { modalOpen: false }

    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })
    }

    render() {
        return (
    <Modal 
        size="tiny"
        trigger={React.cloneElement(this.props.trigger, {onClick: this.handleOpen})}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnDimmerClick={false}
    >
        <Modal.Header style={{ textAlign: "center", backgroundColor: "rgb(0, 0, 0, 0.05)", color: "rgb(0, 0, 0, 0.87)" }}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <AddTransactionForm closeModal={this.handleClose} />
        </Modal.Content>
    </Modal>
)}
}

export default AddTransactionModal