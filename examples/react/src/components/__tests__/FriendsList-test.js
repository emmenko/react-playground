import React from 'react/addons'
import FriendsList from '../FriendsList'
import friendsJson from '../fixture/friends'

var {TestUtils} = React.addons

describe('React::FriendsList', () => {

  it('should render list of items', () => {
    var list = TestUtils.renderIntoDocument(
      <FriendsList />
    )

    var items = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li')
    expect(items.length).toBe(friendsJson.results.length)
  })
})
