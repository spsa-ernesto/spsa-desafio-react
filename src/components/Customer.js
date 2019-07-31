import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Customer extends Component {
    render() {
        const { customer } = this.props;

        return (
            <tr className="table-active" key={customer.customerId}>
                <th scope="row">{customer.firstName}</th>
                <td>{customer.lastName}</td>
                <td>{customer.age}</td>
                <td>{customer.birthDate}</td>
                <td>
                <button className="btn btn-danger" 
                    onClick={() => {
                        if(window.confirm('Seguro de borrar cliente?')){
                            let deleteCustomer = this.props.deleteCustomer.bind(this, customer.customerId);//bind will return to reference to binded function and not call it.
                            deleteCustomer();
                            }}}>
                    Borrar
                </button>                
                </td>
            </tr>
        )
    }
}

// Validation
Customer.propTypes = {
    customer: PropTypes.object.isRequired
}