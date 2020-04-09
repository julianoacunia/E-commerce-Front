import React, { Component } from 'react'
import util from '../helpers/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchProducts,
  deleteProduct,
  setProductOnForm
} from '../redux/actions/productActions'

class productHandler extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const productItems = this.props.products.map(product => (
      <div className='product-private'>
        <div className='thumbnail-text-center'>
          <a href={`#${product._id}`}>
            <img src='https://via.placeholder.com/150' alt='photo' />
            <p>{product.tittle}</p>
          </a>
          <b>{util.formatCurrency(product.price)}</b>
        </div>
          <div className='btn-product'>
          <button
            className='btn-product-handler'
            onClick={() => this.props.deleteProduct(product._id)}
          >
            Delete Product
          </button>
          <button
            className='btn-product-handler'
            onClick={() => this.props.setProductOnForm(product._id)}
          >
            Update Product
          </button>
          </div>
      </div>
    ))
    return <div className='row'>{productItems}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchProducts, deleteProduct, setProductOnForm },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(productHandler)