import React, { Component } from 'react';

export default class CustomerNew extends Component {
  constructor () {
    super();
    this.state = {
      customerId: '',
      firstName: '',
      lastName: '',
      age: '',
      birthDate: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addCustomer(this.state);
    this.setState({
      customerId: '',
      firstName: '',
      lastName: '',
      age: '',
      birthDate: ''
    });    
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="card">
        <div className="btn btn-success">Creación de Cliente</div>
        <form onSubmit={this.onSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChange}
              placeholder="Ingrese Nombre"
              required
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChange}
              placeholder="Ingrese Apellido"
              required
              />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="age"
              className="form-control"
              value={this.state.age}
              onChange={this.onChange}
              placeholder="Ingrese Edad"
              required
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="birthDate"
              className="form-control"
              value={this.state.birthDate}
              onChange={this.onChange}
              placeholder="Ingrese Fecha Nacimiento"
              required
              />
          </div>
          <div>
              <button type="submit" className="btn btn-success">
                Grabar
              </button>
          </div>
        </form>
      </div>
    )
  }
}