import React from 'react'
import { Modal, Form, Input, Dropdown, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isUserLoggedIn, getUserUID } from 'common/user/userSelectors'
import importCointracker from 'common/transactions/import/importCointracker'
import { submitTransactions } from 'common/transactions/transactionsActions'

class AddTransactionModal extends React.Component {
    state = { modalOpen: false }

    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })
    }

    handleFileInput = event => {
        if (event.target.files) {
            importCointracker(event.target.files[0])
                .then(({transactions, errors}) => this.props.submitTransactions(transactions, this.props.isLoggedIn, this.props.uuid))
        }
    }

    render() {
        return (
            <Modal
                size="small"
                trigger={React.cloneElement(this.props.trigger, { onClick: this.handleOpen })}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={true}
            >
                <Modal.Header style={{ textAlign: "center", backgroundColor: "rgb(0, 0, 0, 0.05)", color: "rgb(0, 0, 0, 0.87)" }}>Import transactions</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Dropdown
                            options={[{ key: 'Cointracker', value: 'Cointracker', text: 'Cointracker' }]}
                            placeholder='Select source'
                            selection
                        />
                        <Form.Field>
                            <Button primary icon labelPosition='right' onClick={() => this.fileInput.click()}>
                                <Icon name='file' />
                                Choose File
                                </Button>
                                <input
                                    ref={ref => this.fileInput = ref}
                                    type="file"
                                    hidden
                                    onChange={
                                        event => this.handleFileInput(event)}
                                />
                        </Form.Field>
                        <Button
                            icon
                            positive
                            labelPosition='right'
                            onClick={() => alert('hey')}
                        >
                            <Icon name='download' />
                            Import CSV
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: isUserLoggedIn(state),
    uuid: getUserUID(state)
})

const mapDispatchToProps = dispatch => ({
    submitTransactions: (transactions, isLoggedIn, uuid) => dispatch(submitTransactions(transactions, isLoggedIn, uuid))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionModal)