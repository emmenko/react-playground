import './assets/customer-list'
import React from 'react'
import customersJson from './fixture/customers'
import CustomerListItem from './CustomerListItem'

var CustomerList = React.createClass({
  getInitialState() {
    return {customers: customersJson.results}
  },
  render() {
    return (
      <ul>
        {this.state.customers.map(c => <CustomerListItem customer={c} key={c.id} />)}
      </ul>
    )
  }
})

export default CustomerList