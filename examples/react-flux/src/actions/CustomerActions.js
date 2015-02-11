import Dispatcher from '../Dispatcher'
import Http from '../utils/Http'
import Constants from '../Constants'

var customerActions = {

  fetch(opts = {}) {
    Http.get('/api/customers')
    .then(result => Dispatcher.handleServerAction({
      type: Constants.ActionTypes.FETCH_CUSTOMERS,
      data: result
    }))
    // .fail(err => Dispatcher.handleErrorAction({
    //   type: Constants.ActionTypes.ERROR_FETCH_CUSTOMERS,
    //   data: err
    // }))
  }
}

export default customerActions
