import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import Customer from './Customer'

export default class CustomerList extends Component {
    render() {        
        return (
            <div>
                <div className="container">                  
                    <div className="row mt-4">                        
                        <div className="col-md-8">
                            <div>Lista de Clientes
                                <span className="badge badge-pill badge-light ml-2">
                                    {this.props.customers && this.props.customers.length}
                                </span>
                            </div>                              
                            <table className="table table-hover">
                                <thead>
                                <tr className="table-dark">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Fecha Nacimiento</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.customers && 
                                     this.props.customers.map((customer) =>
                                        <Customer key={customer.customerId}
                                            customer={customer}
                                            deleteCustomer={this.props.deleteCustomer}
                                        />
                                    )}
                                </tbody>
                            </table>        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CustomerList.propTypes = {
    customers: PropTypes.array.isRequired
}
