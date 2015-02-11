import Promise from 'bluebird'

var request = Promise.promisifyAll(require('request'))

var Http = {

  get(url) {
    return request({
      url: url,
      method: 'GET',
      dataType: 'json'
    })
  }

}

export default Http