import React, { Component } from 'react';

class AddCustomerForm extends Component {
  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      birthDay: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // se evita refrescar la pagina
    e.preventDefault();
    // invoca al evento del padre
    this.props.onAddCustomer(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
      birthDay: ''
    });
  }

  onClose(e) {
    // se evita refrescar la pagina
    //e.preventDefault();
    // invoca al evento del padre
    this.props.onClose();
  }

  handleInputChange(e) {
    const {value, name} = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="card">
        <form onSubmit={this.handleSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              placeholder="Nombre"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              placeholder="Apellido"
              />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="age"
              className="form-control"
              value={this.state.age}
              onChange={this.handleInputChange}
              placeholder="Edad"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="birthDay"
              className="form-control"
              value={this.state.birthDay}
              onChange={this.handleInputChange}
              placeholder="Fecha Nacimiento"
              />
          </div>
          <button type="submit" className="btn btn-primary">
          Grabar
          </button>
          <button onClick="onClose" className="btn btn-primary">
          Grabar
          </button>
        </form>
      </div>
    )
  }

}

export default AddCustomerForm;
