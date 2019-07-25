import React, { Component } from 'react';

export default class NewCustomer extends Component {
  constructor () {
    super();
    this.state = {
      customerId: '',
      firstName: '',
      lastName: '',
      age: '',
      birthDay: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSubmit = e => {
    // se evita refrescar la pagina
    e.preventDefault();
    // invoca al evento del padre
    this.props.addCustomer(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
      birthDay: ''
    });    
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClose(e) {
    // invoca al evento del padre
    this.props.onClose();
  }

  render() {
    return (
      <div className="card">
        <form onSubmit={this.onSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChange}
              placeholder="Ingrese Nombre"
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
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="birthDay"
              className="form-control"
              value={this.state.birthDay}
              onChange={this.onChange}
              placeholder="Ingrese Fecha Nacimiento"
              />
          </div>
          <button type="submit" className="btn btn-primary">
            Grabar
          </button>
          <button onClick="onClose" className="btn btn-primary">
            Cerrar
          </button>
        </form>
      </div>
    )
  }
}