import React from 'react/addons'
import CustomerListItem from '../CustomerListItem'
import customersJson from '../fixture/customers'

var {TestUtils} = React.addons

describe('React::CustomerListItem', () => {

  var customer = customersJson.results[0]
  var item = TestUtils.renderIntoDocument(
    <CustomerListItem customer={customer} key={customer.id} />
  )

  it('should render customer information', () => {
    var info = TestUtils.findRenderedDOMComponentWithClass(item, 'customer-info')
    expect(info.getDOMNode().hasChildNodes('span')).toBe(true)
    expect(info.getDOMNode().children[0].textContent).toEqual(customer.firstName + ' ' + customer.lastName)
    expect(info.getDOMNode().children[1].textContent).toEqual('(age: ' + customer.age + ')')
  })

  it('should render customer image', () => {
    var img = TestUtils.findRenderedDOMComponentWithTag(item, 'img')
    expect(img.getDOMNode().getAttribute('src')).toEqual(customer.picture)
  })
})
