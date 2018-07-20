import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddTransactionForm from './AddTransactionForm';

export class AddTransactionContainer extends Component {
    //    static propTypes = {
    //        prop: PropTypes
    //    }
    constructor(props) {
        super(props);
        this.state = { currency: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (props) => {
        this.setState({ [props.target.name]: props.target.value })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        alert('Submitted ' + this.state.value)
        e.preventDefault()
    }

    render() {
        const { currency } = this.state
        return (
            <React.Fragment>
                <AddTransactionForm {...{currency: currency, handleChange: this.handleChange}}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionContainer)
