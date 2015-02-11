import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'
import Constants from '../Constants'

var eventEmitter = new EventEmitter()

// TODO: use immutables
var customers = {
  count: 0,
  total: 0,
  results: []
}

var CustomerStore = {
  subscribe(callback) {
    eventEmitter.addListener(Constants.CHANGE_EVENT, callback)
  },
  unsubscribe(callback) {
    eventEmitter.removeListener(Constants.CHANGE_EVENT, callback)
  },
  getAll() {
    return customers
  }
}

CustomerStore.dispatchToken = Dispatcher.register(payload => {
  var action = payload.action

  switch(action.type) {
    case Constants.ActionTypes.FETCH_CUSTOMERS:
      customers = action.data
      eventEmitter.emit(Constants.CHANGE_EVENT)
      break
    case Constants.ActionTypes.ERROR_FETCH_CUSTOMERS:
      var error = action.data
      // TODO: handle event error
      break
  }
})

export default CustomerStore