import './assets/customer-list'
import React from 'react'
import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../stores/CustomerStore'
import CustomerListItem from './CustomerListItem'

var CustomerList = React.createClass({
  getInitialState() {
    return {customers: CustomerStore.getAll().results}
  },
  componentWillMount() {
    CustomerActions.fetch()
  },
  componentDidMount() {
    CustomerStore.subscribe(this.onChange)
  },
  componentWillUnmount() {
    CustomerStore.unsubscribe(this.onChange)
  },
  onChange() {
    this.setState(this.getInitialState())
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