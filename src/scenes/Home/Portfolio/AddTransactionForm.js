import React, { Component } from 'react'
import { Grid, Label, Icon, Button, Dropdown, Form, Segment } from 'semantic-ui-react'
import DateSelect from 'components/DateSelect'
import { SYMBOLS } from 'common/mockData/currencies'
import style from './AddTransactionForm.module.css'

const SYMBOLS_ = SYMBOLS.map(el => ({ key: el, value: el, text: el }))
const TRANSACTIONS = [{ key: 'transactionType', value: 'withdraw', text: 'Withdraw' },
{ key: 'transactionType', value: 'buy', text: 'Buy' },
{ key: 'transactionType', value: 'sell', text: 'Sell' },
{ key: 'transactionType', value: 'mining', text: 'Mining' }]

const AddTransactionForm = (props) => (
    <Grid centered padded>
        <Form>
            <Form.Field>
                <Dropdown className='icon simple basic' placeholder='Select action' labeled button search options={TRANSACTIONS} />
            </Form.Field>
            <Segment.Group attached>
                <Segment>
                    <Form.Group>
                        <Form.Field>
                            <label>Enter date:</label>
                            <DateSelect />
                        </Form.Field>
                        <Form.Input label="Enter time:" placeholder="HH:MM:SS" />
                    </Form.Group>
                </Segment>
                <CurrencyRow id="hehe" label="Bought" />
                <CurrencyRow label="Sold" />
                <CurrencyRow label="Fee (optional)" />
                <Segment>
                    <Form.Input transparent style={{ width: "100%" }} inline placeholder="Enter optional comment" />
                </Segment>
                <Segment transparent style={{ border: "1px" }}>

                </Segment>
                <Button bottom attached size="big" positive><Icon name='plus' />Add Transaction</Button>
            </Segment.Group>
        </Form >
    </Grid>
)

const CurrencyRow = (props) => (
    <Segment className={style.formRow}>
        <div style={{ margin: "-1.8em 0 0.8em 0", background: "none" }}><span style={{ background: "white", padding: "0 4em", fontWeight: "bold"}}>{props.label}</span></div>
        <Form.Group width="equal">
            <Form.Field style={{ flex: "1 0" }}><Dropdown className='fluid icon basic'
                placeholder='Select Exchange'
                labeled button search options={SYMBOLS_} />
            </Form.Field>
            <Form.Field style={{ flex: "1 0" }}><Dropdown className='fluid icon basic'
                placeholder='Select Currency'
                labeled button search options={SYMBOLS_} />
            </Form.Field>
            <Form.Input className='fluid' label="Value:" placeholder="Enter amount" />
        </Form.Group>
    </Segment>
)


export default AddTransactionForm