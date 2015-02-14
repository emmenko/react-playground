import Promise from 'bluebird'
import friendsJson from '../components/fixture/friends'

// var request = Promise.promisifyAll(require('request'))

var Http = {

  get(url) {
    // return request({
    //   url: url,
    //   method: 'GET',
    //   dataType: 'json'
    // })

    // we don't want to make an actual request,
    // so we just return the fixture
    return new Promise((resolve, reject) => {
      resolve(friendsJson)
    })
  }

}

export default Http