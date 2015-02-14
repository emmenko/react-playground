const actionFetchCustomer = {
  source: 'server-action',
  action: {
    type: 'fetch-customers',
    data: {
      count: 1,
      total: 1,
      results: [{foo: 'bar'}]
    }
  }
}

describe('CustomerStore', () => {
  let Dispatcher, CustomerStore, callback

  beforeEach(() => {
    Dispatcher = require('../../Dispatcher')
    spyOn(Dispatcher, 'register').and.callThrough()
    CustomerStore = require('../CustomerStore')
  })

  xit('should register a callback with the dispatcher', () => {
    expect(Dispatcher.register.calls.count()).toBe(1)
  })

  it('should initialize with default data', () => {
    var customers = CustomerStore.getAllCustomers()
    expect(customers.toJS()).toEqual({
      count: 0,
      total: 0,
      results: []
    })
  })

  it('should populate store with fetched data', () => {
    Dispatcher.dispatch(actionFetchCustomer)
    var customers = CustomerStore.getAllCustomers()
    expect(customers.toJS()).toEqual(actionFetchCustomer.action.data)
  })

  it('should subscribe to updates', () => {
    var callMe = jasmine.createSpy('callMe')

    // subscribe to change events with our mocked fn
    CustomerStore.subscribe(callMe)
    // first call
    Dispatcher.dispatch(actionFetchCustomer)
    expect(callMe.calls.count()).toBe(1)
    // second call
    Dispatcher.dispatch(actionFetchCustomer)
    expect(callMe.calls.count()).toBe(2)

    // when we unsubscribe, there should not be any more calls
    CustomerStore.unsubscribe(callMe)
    Dispatcher.dispatch(actionFetchCustomer)
    expect(callMe.calls.count()).toBe(2)
  })
})