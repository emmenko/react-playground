import React from 'react'
import Promise from 'bluebird'
import {Route, Route, HistoryLocation} from 'react-router'
// import {RouteHandler, run} from 'react-router-async-props'
import {RouteHandler, runFn} from './src/ReactRouterAsyncProps'
import CustomerList from './src/components/CustomerList'

var Groups = React.createClass({
  statics: {
    asyncProps: {
      groups: {
        load () {
          // return GroupsStore.fetchAll();
          return Promise.resolve({name: 'Baz'})
        },
        setup (onChange) {
          console.log('Setup Groups')
        },
        teardown (onChange) {
          console.log('Unmount Groups')
        }
      }
    }
  },

  render () {
    var groups = this.props.groups.map((group) => <li>{group.name}</li>);
    return <ul>{groups}</ul>;
  }
});

var FriendsHandler = React.createClass({
  statics: {
    asyncProps: {
      friends: {

        // load is called before anything renders, and every time data
        // changes, so you'll probably want caching in the routine here
        load () {
          // return FriendStore.fetchAll(); // return a promise (sorry)
          return Promise.resolve({name: 'Bar'})
        },

        // called when the route handler is first mounted
        setup (onChange) {
          // when onChange is called, the app rerenders from the top,
          // calling "load" on all async props again
          // FriendStore.addChangeListenter(onChange);
          console.log('Setup FriendsHandler')
        },

        // called when the route handler is unmounted
        teardown (onChange) {
          console.log('Unmounting FriendsHandler')
          // FriendStore.removeChangeListenter(onChange);
        }
      },

      // get child dependencies (a bit like relay minus graphql)
      // groups: GroupList.asyncProps.groups
      groups: Groups.asyncProps.groups
    }
  },

  render () {
    // value from `asyncProps[key].load` shows up on `this.props[key]`
    var friends = this.props.friends.map((friend) => <li>{friend.name}</li>);
    return (
      <div>
        <ul>{friends}</ul>
        <Groups groups={this.props.groups}/>
      </div>
    );
  }
});

var App = React.createClass({
  statics: {
    asyncProps: {
      user: {
        load () {
          console.log('loading')
          return Promise.resolve({name: 'Foo'})
        }
      }
    }
  },

  render () {
    // only the props that a handler asks for are relayed to it, this
    // `AppHandler` does not get the async props for the FriendList,
    // they aren't coallesced and given to everybody. Each route handler
    // is an entry point into the app and have no dependencies on
    // eachother.
    return (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
        <RouteHandler/> {/* <-- must be from this lib, not the router */}
      </div>
    )
  }
})

var routes = (
  <Route handler={App}>
    <Route name="friends" handler={FriendsHandler}/>
  </Route>
)

console.log('Starting...')

runFn(routes, HistoryLocation, (Handler, state, asyncProps) => {
  React.render(<Handler/>, document.getElementById('app'))
})