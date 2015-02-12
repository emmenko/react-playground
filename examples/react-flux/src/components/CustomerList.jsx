import './assets/customer-list'
import React from 'react'
import Immutable from 'immutable'
import CustomerActions from '../actions/CustomerActions'
import CustomerStore from '../stores/CustomerStore'
import CustomerListItem from './CustomerListItem'

var CustomerList = React.createClass({
  // we don't actually need this in this case,
  // it's just to show how you would use Immutable
  // equality checks to improve rendering performance
  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(this.state.customers, nextState.customers)
  },
  getInitialState() {
    return {customers: CustomerStore.getAllCustomers()}
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
        {this.state.customers.get('results').toJS()/* not needed in react@0.13 */
          .map(c => <CustomerListItem customer={c} key={c.id} />)}
      </ul>
    )
  }
})

export default CustomerList