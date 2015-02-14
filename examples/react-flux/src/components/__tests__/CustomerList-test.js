import React from 'react/addons'
import CustomerList from '../CustomerList'
import customersJson from '../fixture/customers'

var {TestUtils} = React.addons

describe('Flux::CustomerList', () => {

  let list

  xit('should render list of items', () => {
    list = TestUtils.renderIntoDocument(
      <CustomerList />
    )
    var items = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li')
    expect(items.length).toBe(customersJson.results.length)

  })
})
