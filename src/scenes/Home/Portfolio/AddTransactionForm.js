import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import { Dropdown, Form, Segment } from 'semantic-ui-react'

const countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }]

const DropdownExampleSearchSelection = () => (
    <Dropdown placeholder='Select Country' fluid search selection options={countryOptions} />
)

export default class AddTransactionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Transaction Type:</label>
                    <DropdownExampleSearchSelection />
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <label>Enter Date:</label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Enter time:</label>
                        <input></input>
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Amount:</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount:</label>
                        <DropdownExampleSearchSelection />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Amount:</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount:</label>
                        <DropdownExampleSearchSelection />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Amount:</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount:</label>
                        <DropdownExampleSearchSelection />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Amount:</label>
                        <input />
                    </Form.Field>
                </Form.Group>
            </Form>
        )
    }
}