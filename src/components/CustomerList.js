import React, { Component } from 'react';
import Customer from './Customer'

export default class CustomerList extends Component {
    componentDidMount() {
        let getCustomerAll = this.props.getCustomerAll.bind(this);
        getCustomerAll();
    }

    render() {
        if (this.props.isLoading) {
          return <p>Loading...</p>;
        }

        return (
            <div className="card">
            <div className="btn btn-success">
                <div>Lista de Clientes
                    <span className="badge badge-pill badge-light ml-2">
                        {this.props.data && this.props.data.length}
                    </span>
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                <tr className="table-dark">
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Fecha Nacimiento</th>
                    <th width="10%"></th>
                </tr>
                </thead>
                <tbody>
                    {this.props.data && 
                        this.props.data.map((customer) =>
                        <Customer key={customer.customerId}
                            customer={customer}
                            deleteCustomer={this.props.deleteCustomer}
                        />
                    )}
                </tbody>
            </table>        
        </div>
        );
    }
}
