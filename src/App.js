import React, {Component} from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerNew from './components/CustomerNew';
import CustomerKpi from './components/CustomerKpi';
import {customersOfflineData} from './customersOfflineData.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      title: 'Inicio',
      customers: [],
      customersOffline: customersOfflineData,
      customerKpi: [],
      backToHome: false,
      isLoading: false,
      offline: false
    };
    this.handleGoHomeClick = this.handleGoHomeClick.bind(this);
    this.handleGoCustomerNewClick = this.handleGoCustomerNewClick.bind(this);
    this.handleGoCustomerListClick = this.handleGoCustomerListClick.bind(this);
    this.handleGoCustomerKpiClick = this.handleGoCustomerKpiClick.bind(this);

    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    this.getCustomerAll = this.getCustomerAll.bind(this);
    this.getCustomerKpi = this.getCustomerKpi.bind(this);

    this.serverUrl = "http://localhost:8081";
    this.customersUrl = this.serverUrl + "/api/v1/customers";
    this.customerKpiUrl = this.serverUrl + "/api/v1/customers/kpi";
  };

  handleGoHomeClick(e) {
    e.preventDefault();
    this.setState({
      page: 'home',
      title: 'Inicio'
    });
  }

  handleGoCustomerNewClick(e) {
    e.preventDefault();
    this.setState({
      page: 'customerNew',
      title: 'Creación de Cliente'
    });
  }

  handleGoCustomerListClick(e) {
    e.preventDefault();
    this.setState({
      page: 'customerList',
      title: 'Lista de Clientes'
    });
  }

  handleGoCustomerKpiClick(e) {
    e.preventDefault();
    this.setState({
      page: 'customerKpi',
      title: 'KPI de Clientes'
    });
  }   
  
  getCustomerAll() {
    this.setState({ isLoading: true });
    fetch(this.customersUrl)
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
            customers: data, 
            isLoading: false,
            offline: false });
        })
        .catch((err) => {
          this.toogleOfflineMode();
        });
  }
 
  getCustomerKpi() {
    this.setState({ isLoading: true });
    fetch(this.customerKpiUrl)
        .then(res => res.json())
        .then((data) => this.setState({ customerKpi: data, isLoading: false }))
        .catch((err) => {
          this.setState({customerKpi: {averageAge: 33.05, standardDeviation:5.89}});
          this.toogleOfflineMode();
        });
  };   

  handleAddCustomer(customer) {
    fetch(this.customersUrl, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(customer)
    })
    .then(() => alert('Datos registrados satisfactoriamente!'))
    .catch((err) => {
      customer.estimateDeathDate = "01/01/2060"
      this.setState({
        customersOffline: [...this.state.customersOffline, customer]
      });
      this.toogleOfflineMode();
      alert('Datos registrados satisfactoriamente!');
    });    
  };

  handleDeleteCustomer(customerId) {
    fetch(this.customersUrl, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(customerId)
    })
    .then(() => this.setState({page: 'home', title: 'Inicio'}))
    .catch((err) => {
      this.setState({
        customersOffline: this.state.customersOffline.filter((customer) => {
          return customer.customerId !== customerId
        })
      });      
      this.toogleOfflineMode();
    }); 
  };

  toogleOfflineMode() {
    this.setState({
      isLoading: false,
      offline: true });
  }

  getCustomersData(){
    return this.state.offline ? this.state.customersOffline : this.state.customers;
  }

  getModeText() {
    return this.state.offline ? "Offline" : "Online";
  }

  getContent() {
    if (this.state.page === 'home') {
      return (
        <div className="btn-group-vertical" data-toggle="buttons">
          <button className="btn btn-outline-success"
            onClick={this.handleGoCustomerNewClick}>
            Creación de Cliente
          </button>
          <button className="btn btn-outline-success"
            onClick={this.handleGoCustomerListClick}>
            Lista de Clientes
          </button>
          <button className="btn btn-outline-success"
            onClick={this.handleGoCustomerKpiClick}>
            KPI de Clientes
          </button>            
        </div>
      )
    } else if (this.state.page === 'customerNew') {
      return <CustomerNew addCustomer={this.handleAddCustomer}
                          onBack={this.handleBackToHome} />;
    } else if (this.state.page === 'customerList') {
      return <CustomerList data={this.getCustomersData()}
                           getCustomerAll={this.getCustomerAll}
                           deleteCustomer={this.handleDeleteCustomer}/>;
    } else if (this.state.page === 'customerKpi') {
      return <CustomerKpi data={this.state.customerKpi}
                          getCustomerKpi={this.getCustomerKpi}/>;
    }
  }

  render() {
    let hrefLink = '#';

    return (
      <div className="card">
        <div className="card-header">
        <div className="card-link">
            <div className="Inline-left" >
            <a href={hrefLink} onClick={this.handleGoHomeClick}>
              Inicio
              <i className="material-icons">home</i>
            </a>
            </div> 
            <div className="Inline-center">SPSA - Mantenimiento de Clientes</div>
            <div className="Inline-right">({this.getModeText()})</div>        
          </div>
        </div>        
        <div>
          {this.getContent()}
        </div>
      </div>
    );
  }
}

export default App;
