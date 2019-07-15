import React, {Component} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from './components/modalForm.js';

// data
import {customers} from './customers.json';

// subcomponents
import AddCustomerForm from './components/addCustomerForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers,
      showModal: false
    };
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  };

  handleAddCustomer(customer) {
    this.setState({
      customers: [...this.state.customers, customer]
    });
    this.handleClose();
  };

  removeCustomer(index) {
    this.setState({
      customers: this.state.customers.filter((e, i) => {
        return i !== index
      })
    });
  };

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    const customers = this.state.customers.map((customer, i) => {
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
    });

    const modalAddCustomer = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <AddCustomerForm onAddCustomer={this.handleAddCustomer}
                           onShow={this.state.showModal}
                           onClose={this.handleHide}>
          </AddCustomerForm>
        </div>
      </Modal>
    ) : null;

    // RETURN THE COMPONENT
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Clientes
            <span className="badge badge-pill badge-light ml-2">
              {this.state.customers.length}
            </span>
          </a>
        </nav>

        <div>
          <Button variant="primary" onClick={this.handleShow}>
            Agregar Cliente
          </Button>
        </div>

        <div>
          {modalAddCustomer}
        </div>

        <div className="container">
          <div className="row mt-4">
            <div className="col-md-8">
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
                  {customers}
              </tbody>
            </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
