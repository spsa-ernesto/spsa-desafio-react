import React, { Component } from 'react'

export default class KpiCustomers extends Component {
    render() {
        const { data } = this.props;

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr className="table-dark">
                        <th scope="col">Promedio edad</th>
                        <th scope="col">Desviación estándar</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="table-active">
                            <th scope="row">{data.averageAge}</th>
                            <td>{data.standardDeviation}</td>
                            <td>
                            <button onClick={this.props.onBack} className="btn btn-primary">
                                Regresar
                            </button>               
                            </td>
                        </tr>                          
                    </tbody>
                </table> 
            </div>
        )
    }
}
