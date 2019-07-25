import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Customer extends Component {
    render() {
        const { customer } = this.props;

        return (
            <div>
                <tr className="table-active" key={customer.customerId}>
                    <th scope="row">{customer.firstName}</th>
                    <td>{customer.lastName}</td>
                    <td>{customer.age}</td>
                    <td>{customer.birthDate}</td>
                    <td>
                    <button
                        className="btn btn-danger"
                        onClick={this.props.deleteCustomer.bind(this, customer.customerId)}>
                        Borrar
                    </button>
                    </td>
                </tr>
            </div>
        )
    }
}

// Validation
Customer.propTypes = {
    task: PropTypes.object.isRequired
}