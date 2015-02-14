var ensureSingleListenerCall = (listener, payload) => {
  expect(listener.calls.count()).toBe(1)
  expect(listener.calls.mostRecent().args[0]).toEqual(payload)
}

describe('Dispatcher', () => {
  let Dispatcher, listener
  const payload = {foo: 'bar'}

  beforeEach(() => {
    // listener = jasmine.createSpy('listener')
    Dispatcher = require('../Dispatcher')
  })

  afterEach(() => {
    Dispatcher = null
    listener = null
  })

  xit('should send actions to subscribers', () => {
    var callMe = (p) => {
      console.log('bubi')
      expect(p).toEqual(payload)
    }
    spyOn(Dispatcher, 'register')
    Dispatcher.register(callMe)
    Dispatcher.dispatch(payload)
    // ensureSingleListenerCall(listener, payload)
    expect(Dispatcher.register).toHaveBeenCalledWith(payload)
  })

  xit('should dispatch server action', () => {
    Dispatcher.handleServerAction(payload)
    ensureSingleListenerCall(listener, {
      source: 'server-action',
      action: {foo: 'bar'}
    })
  })

  xit('should dispatch view action', () => {
    Dispatcher.handleViewAction(payload)
    ensureSingleListenerCall(listener, {
      source: 'view-action',
      action: {foo: 'bar'}
    })
  })

  xit('should dispatch error action', () => {
    Dispatcher.handleErrorAction(payload)
    ensureSingleListenerCall(listener, {
      source: 'error-action',
      action: {foo: 'bar'}
    })
  })

})