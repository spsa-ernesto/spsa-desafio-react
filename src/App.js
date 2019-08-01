import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import CustomerList from './components/CustomerList';
import CustomerNew from './components/CustomerNew';
import CustomerKpi from './components/CustomerKpi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      customerKpi: [],
      backToHome: false,
      isLoading: false
    };
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    this.handleBackToHome = this.handleBackToHome.bind(this);    
  };

  componentDidMount() {
    this.getCustomerAll();
    this.getCustomerKpi();
  };

  getCustomerAll() {
    try {
      fetch(`http://localhost:8081/api/v1/customers`)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          customers: data,
          isLoading: false,
        })
      )
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };  
 
  getCustomerKpi() {
    try {
      fetch(`http://localhost:8081/api/v1/customers/kpi`)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          customerKpi: data,
          isLoading: false,
        })
      )
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };   

  handleAddCustomer(customer) {
    try {
      fetch(`http://localhost:8081/api/v1/customers`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
      })
      .then(() => this.handleBackToHome());      
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  handleDeleteCustomer(customerId) {
    try {
      fetch(`http://localhost:8081/api/v1/customers`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customerId)
      })
      .then(() => this.handleBackToHome());
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };   

  handleBackToHome() {
    console.log("handleBackToHome");
    this.getCustomerAll();
    this.getCustomerKpi();
    document.getElementById('home').click();
  }

  render() { 
    return (
      <div>
        <Router>
          <NavLink id="home" to="/">Inicio</NavLink>
          <br/>
          <NavLink to="/customerNew">Creación de Cliente</NavLink>
          <br/>
          <NavLink to="/">Lista de Clientes</NavLink>
          <br/>
          <NavLink to="/customerKpi">KPI de Clientes</NavLink>  
          <br/>
          <br/>          
          <Route exact path="/" render={() => {
            return  (
              <div>
                <CustomerList   
                  customers={this.state.customers}
                  deleteCustomer={this.handleDeleteCustomer}/>
              </div>)
          }}>
          </Route>

          <Route path="/customerNew" render={() => {
            return <CustomerNew
              addCustomer={this.handleAddCustomer}
              onBack={this.handleBackToHome} />;
          }}/>

          <Route path="/customerKpi" render={() => {
            return <CustomerKpi 
              data={this.state.customerKpi}
              onBack={this.handleBackToHome} />;
          }}/>
        </Router>        
      </div>   
    );
  }
}

export default App;
