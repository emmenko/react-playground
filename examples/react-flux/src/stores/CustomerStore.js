import {EventEmitter} from 'events'
import React from 'react/addons'
import {Map, List, fromJS} from 'immutable'
import Dispatcher from '../Dispatcher'
import Constants from '../Constants'

var eventEmitter = new EventEmitter()

var store = Map({
  customers: Map({
    count: 0,
    total: 0,
    results: List()
  })
})

var CustomerStore = {
  subscribe(callback) {
    eventEmitter.addListener(Constants.CHANGE_EVENT, callback)
  },
  unsubscribe(callback) {
    eventEmitter.removeListener(Constants.CHANGE_EVENT, callback)
  },
  getAllCustomers() {
    return store.get('customers')
  }
}

CustomerStore.dispatchToken = Dispatcher.register(payload => {
  var action = payload.action

  switch(action.type) {
    case Constants.ActionTypes.FETCH_CUSTOMERS:
      store = store.set('customers', fromJS(action.data))
      eventEmitter.emit(Constants.CHANGE_EVENT)
      break
    case Constants.ActionTypes.ERROR_FETCH_CUSTOMERS:
      var error = action.data
      // TODO: handle event error
      break
  }
})

export default CustomerStore