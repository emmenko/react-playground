import rewire from 'rewire'
import React from 'react/addons'
import Immutable from 'immutable'
import customersJson from '../fixture/customers'

var {TestUtils} = React.addons

describe('Flux::CustomerList', () => {

  let CustomerList

  beforeEach(() => {
    CustomerList = rewire('../CustomerList')
    CustomerList.__set__('CustomerActions', {
      fetch() {}
    })
    CustomerList.__set__('CustomerStore', {
      getAllCustomers() {
        return Immutable.fromJS(customersJson)
      },
      subscribe() {},
      unsubscribe() {}
    })
  })

  it('should render list of items', () => {
    var list = TestUtils.renderIntoDocument(
      <CustomerList />
    )

    var items = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li')
    expect(items.length).toBe(customersJson.results.length)
  })
})
