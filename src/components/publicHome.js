import '../styles/home.css'
import React, { Component } from 'react'
import Categories from './categorie'
import Basket from './basket'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class publicHome extends Component {
  render() {
    return (
      <div className='container'>
        <div className='tittle'>
          <h1>E-commerce-Acuña</h1>
        </div>
        <hr />
        <div className='row'>
        <div className='col-md-8'>
            <Categories/>
          </div>
        <div id='col-md-4'>
          <div className='menu'>
            <div className='buttonmenu'>
              <Link to='/register'>Sign up</Link>
            </div>
            <div className='buttonmenu'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
          <div className='basket'>
            <Basket/>
          </div>
        </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    cart: state.cart,
    isLoading: state.isLoading,
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(publicHome)
