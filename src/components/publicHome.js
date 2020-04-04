import '../styles/home.css'
import React, { Component } from 'react'
import Basket from './basket'
import Filter from './filter'
import Products from './products'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class publicHome extends Component {
  render() {
    return (
      <div className='container'>
        <h1>---Welcome to t-shirts store!---</h1>
        <div id='login2'>
          <div className='buttonmenu'>
            <Link to='/register'>Sign up</Link>
          </div>
          <div className='buttonmenu'>
            <Link to='/login'>Login</Link>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-8'>
            <Products/>
          </div>
          <div className='col-md-4'>
            <Basket/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    isLoading: state.isLoading,
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicHome)
