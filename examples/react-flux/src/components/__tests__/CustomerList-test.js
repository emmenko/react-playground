jest.autoMockOff()

import React from 'react/addons'
import CustomerList from '../CustomerList'
import customersJson from '../fixture/customers'

var TestUtils = React.addons.TestUtils

describe('CustomerList', () => {

  it('should render list of items', () => {
    var list = TestUtils.renderIntoDocument(
      <CustomerList />
    )

    var items = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li')
    expect(items.length).toBe(customersJson.results.length)
  })
})
