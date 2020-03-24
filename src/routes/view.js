import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/login'
import Home from '../components/home'
import Register from '../components/register'
import PublicHome from '../components/publicHome'
import store from '../redux/store'

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/home' component={Home} />
          <Route exact path='/catalog' component={PublicHome} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Redirect from='/' to='/catalog' />
        </Switch>
      </BrowserRouter>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().users.token ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
)

export default connect()(Routes)
