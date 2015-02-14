import rewire from 'rewire'
import React from 'react/addons'
import Immutable from 'immutable'
import friendsJson from '../fixture/friends'

var {TestUtils} = React.addons

describe('Flux::FriendsList', () => {

  let FriendsList

  beforeEach(() => {
    FriendsList = rewire('../FriendsList')
    FriendsList.__set__('FriendsActions', {
      fetch() {}
    })
    FriendsList.__set__('FriendsStore', {
      getAllFriends() {
        return Immutable.fromJS(friendsJson)
      },
      subscribe() {},
      unsubscribe() {}
    })
  })

  it('should render list of items', () => {
    var list = TestUtils.renderIntoDocument(
      <FriendsList />
    )

    var items = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li')
    expect(items.length).toBe(friendsJson.results.length)
  })
})
