import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomerList extends Component {
    render() {
        
        return (
            <div>
                {this.props.customers.map((customer, i) => {
                    return (
                        <tr className="table-active" key={i}>
                            <th scope="row">{customer.firstName}</th>
                            <td>{customer.lastName}</td>
                            <td>{customer.age}</td>
                            <td>{customer.birthDate}</td>
                            <td>
                            <button
                                className="btn btn-danger"
                                onClick={this.removeCustomer.bind(this, i)}>
                                Borrar
                            </button>
                            </td>
                        </tr>
                    )
                })}
            </div>
        )
    }
}

CustomerList.propTypes = {
    customers: PropTypes.array.isRequired
}
