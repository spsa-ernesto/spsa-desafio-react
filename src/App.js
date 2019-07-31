import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import CustomerList from './components/CustomerList';
import NewCustomer from './components/NewCustomer';
import KpiCustomers from './components/KpiCustomers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      kpiCustomers: [],
      backToHome: false,
      isLoading: false
    };
    this.handleNewCustomer = this.handleNewCustomer.bind(this);
    this.handleBackToHome = this.handleBackToHome.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  };

  async componentDidMount() {
    this.getAllCustomers();
    this.getKpiCustomers();
  };

  async getAllCustomers() {
    try {
      let response = await fetch(`http://localhost:8081/api/v1/customers`);
      let responseJson = await response.json();
      this.setState({
        customers: responseJson,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };  

  async getKpiCustomers() {
    try {
      let response = await fetch(`http://localhost:8081/api/v1/customers/kpi`);
      let responseJson = await response.json();
      this.setState({
        kpiCustomers: responseJson,
        isLoading: false,
      });
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
    this.getAllCustomers();
    this.getKpiCustomers();
    document.getElementById('home').click();
  }

  handleNewCustomer(customer) {
    this.postData(customer);
    this.handleBackToHome();
  };

  deleteCustomer(index) {
    this.deleteData(index);
    this.handleBackToHome();
  };

  render() { 
    return (
      <div>
        <Router>
          <NavLink id="home" to="/">Inicio</NavLink>
          <br/>
          <NavLink to="/newCustomer">Creación de Cliente</NavLink>
          <br/>
          <NavLink to="/">Lista de Clientes</NavLink>
          <br/>
          <NavLink to="/kpiCustomers">KPI de Clientes</NavLink>  

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

          <Route path="/kpiCustomers" render={() => {
            return <KpiCustomers 
              data={this.state.kpiCustomers}
              onBack={this.handleBackToHome} />;
          }}/>
        </Router>        
      </div>   
    );
  }
}

export default App;
