import React, { Component } from 'react'

export default class CustomerKpi extends Component {
    componentDidMount() {
        let getCustomerKpi = this.props.getCustomerKpi.bind(this);
        getCustomerKpi();
    }      

    render() {
        return (
            <div className="card">
            <div className="btn btn-success">KPI de Clientes</div>
                <table className="table table-hover">
                    <thead>
                    <tr className="table-dark">
                        <th scope="col">Promedio edad</th>
                        <th scope="col">Desviación estándar</th>
                        <th width="10%"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="table-active">
                            <td>{this.props.data.averageAge}</td>
                            <td>{this.props.data.standardDeviation}</td>
                            <td></td>
                        </tr>                          
                    </tbody>
                </table> 
            </div>
        )
    }
}
