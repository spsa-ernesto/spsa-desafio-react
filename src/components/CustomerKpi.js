import React, { Component } from 'react'

export default class CustomerKpi extends Component {
    render() {
        const { data } = this.props;

        return (
            <div className="card">
            <div className="btn btn-primary">KPI de Clientes</div>
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
                            <td>{data.averageAge}</td>
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
