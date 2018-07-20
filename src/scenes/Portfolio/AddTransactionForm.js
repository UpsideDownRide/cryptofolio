import React from 'react'
import { Grid, Label, Icon, Button, Dropdown, Form, Segment } from 'semantic-ui-react'
import DateSelect from 'components/DateSelect'
import { SYMBOLS } from 'common/mockData/currencies'
import style from './AddTransactionForm.module.css'

const SYMBOLS_ = SYMBOLS.map(el => ({ key: el, value: el, text: el }))
const TRANSACTIONS = [{ key: 'withdraw', value: 'withdraw', text: 'Withdraw' },
{ key: 'buy', value: 'buy', text: 'Buy' },
{ key: 'sell', value: 'sell', text: 'Sell' },
{ key: 'mining', value: 'mining', text: 'Mining' }]

const AddTransactionForm = (props) => (
    <Grid centered padded>
        <Form>
            <Dropdown className='primary icon' placeholder='Select action' labeled button search options={TRANSACTIONS} />
            <Segment.Group>
                <Segment>
                    <Form.Group>
                        <Form.Field>
                            <label>Enter date:</label>
                            <DateSelect />
                        </Form.Field>
                        <Form.Input label="Enter time:" placeholder="HH:MM:SS" />
                    </Form.Group>
                </Segment>
                <CurrencyRow operation="buy" label="Bought" />
                <CurrencyRow operation="sell" label="Sold" />
                <CurrencyRow operation="fee" label="Fee (optional)" />
                <Segment>
                    <Form.Input name="currency" onBlur={props.handleChange} style={{ width: "100%" }} inline placeholder="Enter optional comment" />
                </Segment>
                <Segment style={{ border: "1px" }}>

                </Segment>
                <Button type="submit" attached="bottom" size="big" positive><Icon name='plus' />Add Transaction</Button>
            </Segment.Group>
        </Form >
    </Grid>
)

const CurrencyRow = (props) => {
    const { operation, label } = props
    return (
        <Segment className={style.formRow}>
            <div style={{ margin: "-1.8em 0 0.8em 0", background: "none" }}>
                <span style={{ background: "white", padding: "0 4em", fontWeight: "bold" }}>
                    {label}
                </span>
            </div>
            <Form.Group width="equal">
                <Form.Field style={{ flex: "1 0" }}>
                    <Dropdown className='fluid icon basic'
                        placeholder='Select Exchange'
                        labeled button search options={SYMBOLS_}
                        name={`${operation}-exchange`} />
                </Form.Field>
                <Form.Field style={{ flex: "1 0" }}>
                    <Dropdown className='fluid icon basic'
                    placeholder='Select Currency'
                    name={`${operation}-exchange`} labeled button search options={SYMBOLS_} />
</Form.Field>
                <Form.Field className='fluid'>
                    <label style={{ marginTop: "1em" }}>Value:</label>
                    <input name={`${operation}-exchange`} placeholder="Enter amount" />
                </Form.Field>
            </Form.Group>
        </Segment>
    )
}


export default AddTransactionForm