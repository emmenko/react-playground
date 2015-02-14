import './assets/friends-list'
import React from 'react'
import friendsJson from './fixture/friends'
import FriendsListItem from './FriendsListItem'

var FriendsList = React.createClass({
  getInitialState() {
    return {friends: friendsJson.results}
  },
  render() {
    var friends = this.state.friends.map(f => <FriendsListItem friend={f} key={f.id} />)
    return (
      <ul>
        {friends}
      </ul>
    )
  }
})

export default FriendsList