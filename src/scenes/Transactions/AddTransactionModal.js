import React from 'react'
import { Modal } from 'semantic-ui-react'
import AddTransactionForm from './AddTransaction/AddTransactionContainer'
import style from './AddTransactionModal.module.css'

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
                trigger={React.cloneElement(this.props.trigger, { onClick: this.handleOpen })}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={false}
                className={style.modal}
            >
                <Modal.Content scrolling className={style.content}>
                    <AddTransactionForm closeModal={this.handleClose} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default AddTransactionModal