import React from 'react'

var CustomerInfo = React.createClass({
  render() {
    return (
      <div className='customer-info pull-left'>
        <span>{this.props.firstName} {this.props.lastName}</span>
        <span>(age: {this.props.age})</span>
      </div>
    )
  }
})

var CustomerListItem = React.createClass({
  render() {
    return (
      <li className='clearfix'>
        <div className='pull-left'>
          <img src={this.props.customer.picture} />
        </div>
        <CustomerInfo
          firstName={this.props.customer.firstName}
          lastName={this.props.customer.lastName}
          age={this.props.customer.age} />
      </li>
    )
  }
})

export default CustomerListItem
