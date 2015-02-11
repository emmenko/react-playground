jest.dontMock('events')
jest.dontMock('object-assign')
jest.dontMock('../CustomerStore')

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
    CustomerStore = require('../CustomerStore')
    callback = Dispatcher.register.mock.calls[0][0]
  })

  it('should register a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1)
  })

  it('should initialize with default data', () => {
    var customers = CustomerStore.getAll()
    expect(customers).toEqual({
      count: 0,
      total: 0,
      results: []
    })
  })

  it('should populate store with fetched data', () => {
    callback(actionFetchCustomer)
    var customers = CustomerStore.getAll()
    expect(customers).toEqual(actionFetchCustomer.action.data)
  })

  it('should subscribe to updates', () => {
    var callMe = jest.genMockFunction()

    // subscribe to change events with our mocked fn
    CustomerStore.subscribe(callMe)
    // first call
    callback(actionFetchCustomer)
    expect(callMe.mock.calls.length).toBe(1)
    // second call
    callback(actionFetchCustomer)
    expect(callMe.mock.calls.length).toBe(2)

    // when we unsubscribe, there should not be any more calls
    CustomerStore.unsubscribe(callMe)
    callback(actionFetchCustomer)
    expect(callMe.mock.calls.length).toBe(2)
  })
})