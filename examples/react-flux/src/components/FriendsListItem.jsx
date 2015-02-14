import React from 'react'

var FriendsInfo = React.createClass({
  render() {
    return (
      <div className='friend-info pull-left'>
        <span>{this.props.firstName} {this.props.lastName}</span>
        <span>(age: {this.props.age})</span>
      </div>
    )
  }
})

var FriendsListItem = React.createClass({
  render() {
    return (
      <li className='clearfix'>
        <div className='pull-left'>
          <img src={this.props.friend.picture} />
        </div>
        <FriendsInfo
          firstName={this.props.friend.firstName}
          lastName={this.props.friend.lastName}
          age={this.props.friend.age} />
      </li>
    )
  }
})

export default FriendsListItem
