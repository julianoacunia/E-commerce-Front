import '../styles/privateHome.css'
import React, { Component } from 'react'
import { connect, useStore } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postProduct, updateProduct } from '../redux/actions/productActions'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { isAuth, logOut } from '../redux/actions/loginActions'
import ProductsHandler from '../components/productHandler'
import { fetchCategories } from '../redux/actions/categorieActions'

class home extends Component {
  capturarDatos() {
    console.log('ENTRO AL CAPTURA')
    const productToUpdate = this.props.products.find(
      product => product._id === this.props.productSelected
    )
    return {
      tittle: productToUpdate.tittle,
      description: productToUpdate.description,
      availableSize: productToUpdate.availableSize,
      price: productToUpdate.price
    }
  }
  componentDidMount(){
    this.props.fetchCategories()
  }
  render() {
    return (
      <div className='container'>
        <div className='tittle'>
          <h1>---Admin panel---</h1>
        </div>
        {this.props.isAuth ? (
        <div className='logged'>
          <div className='adminsession'>{this.props.name}</div>
        <div className='buttonmenu'>
          <Link to='/login' onClick={this.props.logOut}>Logout</Link>
        </div>
          </div>
        ) : (
          <div id='login2'>
            <div className='buttonmenu'>
              <Link to='/register'>Sign up</Link>
            </div>
            <div className='buttonmenu'>
              <Link to='/login'>Login</Link>
            </div>
          </div>
        )}
        <hr />
        <div className='row'>
          <div className='productsHandler'>
            <ProductsHandler />
          </div>
        </div>
        <div className='forms-edition'>
        <div className='form-add'>
            <h4>Add new product</h4>
            <div className='form-container'>
              <Formik
                initialValues={{
                  id: '',
                  photo: 'https://via.placeholder.com/150',
                  tittle: '',
                  description: '',
                  availableSize: '',
                  price: 0,
                  category: ''
                }}
                onSubmit={values => {
                  this.props.postProduct(values)
                }}
              >
                {({ handleSubmit }) => (
                  <Form 
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      marginTop: '20px',
                      border: '2px solid'
                    }}
                  >
                    <Field type='text' name='id' placeholder='code' />
                    <Field type='text' name='tittle' placeholder='tittle' />
                    <Field
                      type='text'
                      name='description'
                      placeholder='description'
                    />
                    <Field
                      type='text'
                      name='availableSize'
                      placeholder='availableSize'
                    />
                    <Field type='number' name='price' placeholder='price' />
                    <Field as="select" name="category">
                    {this.props.categories.map(category => 
                      (<option value={category}>{category.name}</option>))}
                    </Field>
                    <button id='btn-form' type='submit'>Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className='form-update'>
            <h4>Update product</h4>
            <Formik
              initialValues={
                !this.props.productSelected
                  ? {
                      title: '',
                      photo: 'https://via.placeholder.com/150',
                      description: '',
                      availableSize: '',
                      price: 0
                    }
                  : this.capturarDatos()
              }
              onSubmit={values => {
                this.props.updateProduct({
                  ...values,
                  _id: this.props.productSelected
                })
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    marginTop: '40px',
                    border: '2px solid'
                  }}
                >
                  <Field type='text' name='title' placeholder='tittle' />
                  <Field
                    type='text'
                    name='description'
                    placeholder='description'
                  />
                  <Field
                    type='text'
                    name='availableSize'
                    placeholder='availableSize'
                  />
                  <Field type='number' name='price' placeholder='price' />
                  <button id='btn-form' type='submit'>Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.items,
    categories: state.categories.items,
    name: state.users.user,
    isLoading: state.isLoading,
    isAuth: state.isAuth,
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postProduct, updateProduct, isAuth, logOut, fetchCategories },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(home)
