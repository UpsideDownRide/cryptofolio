import React from 'react'
import { Dropdown, Button, Header, Segment, Modal, Icon } from 'semantic-ui-react'

const countryOptions = [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' } ]

const DropdownExampleSearchSelection = () => (
    <Dropdown placeholder='Select Country' fluid search selection options={countryOptions} />
)


const ModalModalExample = () => (
    <Modal trigger={<Button positive><Icon name='plus' />Add Transaction</Button>}>
        <Modal.Header style={{backgroundColor: "#21BA45", color: "#FFFFFF"}}>Add a new transaction</Modal.Header>
        <Modal.Content>
            <Segment>Type and Date</Segment>
            <Segment>Buy</Segment>
            <Segment>Sell</Segment>
            <Segment>Fee</Segment>
            <Segment>Details</Segment>
        </Modal.Content>
    </Modal>
)

export default ModalModalExample