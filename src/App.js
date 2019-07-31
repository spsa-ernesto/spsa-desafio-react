import React, {Component} from 'react';
import './App.css';
//import {customers} from './customers.json';
import {BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import CustomerList from './components/CustomerList';
import NewCustomer from './components/NewCustomer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      backToHome: false,
      isLoading: false
    };
    this.handleNewCustomer = this.handleNewCustomer.bind(this);
    this.handleBackToHome = this.handleBackToHome.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  };

  componentDidMount_old() {
    fetch(`http://localhost:8081/api/v1/customers`)
    .then(response => response.json())
    .then(data =>
      this.setState({
        customers: data,
        isLoading: false,
      }))
    .catch((error) => {
      console.error(error);
      this.setState({ isLoading: false });
    });    
  };

  async componentDidMount() {
    try {
      let response = await fetch(`http://localhost:8081/api/v1/customers`);
      let responseJson = await response.json();
      this.setState({
        customers: responseJson,
        isLoading: false,
      })
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  postData(customer) {
    try {
      fetch(`http://localhost:8081/api/v1/customers`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  deleteData(customerId) {
    try {
      fetch(`http://localhost:8081/api/v1/customers`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customerId)
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };   

  handleBackToHome() {
    document.getElementById('home').click();
  }

  handleNewCustomer(customer) {
    this.postData(customer);
    this.handleBackToHome();
  };

  deleteCustomer(index) {
    this.setState({
      customers: this.state.customers.filter((customer) => {
        return customer.customerId!== index
      })
    });
    this.deleteData(index);
  };

  render() { 
    // return the component
    return (
      <div>
        <Router>
          <NavLink id="home" to="/">Inicio</NavLink>
          <br/>
          <NavLink to="/newCustomer">Creación de Cliente</NavLink>

          <Route exact path="/" render={() => {
            return  (
              <div>
                <CustomerList   
                  customers={this.state.customers}
                  deleteCustomer={this.deleteCustomer}/>
              </div>)
          }}>
          </Route>
          <Route path="/newCustomer" render={() => {
            return <NewCustomer 
              addCustomer={this.handleNewCustomer}
              onBack={this.handleBackToHome} />;
          }}/>
        </Router>
      </div>   
    );
  }
}

export default App;
