import '../styles/register.css'
import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postUser } from '../redux/actions/loginActions'

class register extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='tittle-login'>
          <h1>E-commerce-Acuña</h1>
        </div>
        <div id='container-back-to-login'>
          <div className='back-to-login-div1'>
            <Link id='back-to-login-link' to='/login'>
              Back to Login
            </Link>
          </div>
          <div className='back-to-catalog-div1'>
            <Link id='back-to-catalog-link' to='/catalog'>
              Back to Catalog
            </Link>
          </div>
        </div>
        <div className='register-container'>
          <Formik
            initialValues={{ name: '', email: '', password: '', address: '' }}
            onSubmit={values => {
              this.props.postUser(values)
            }}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Field
                  type='text'
                  name='name'
                  id='inputUser'
                  placeholder='name'
                />
                <Field
                  type='text'
                  name='email'
                  id='inputEmail'
                  placeholder='email'
                />
                <Field
                  type='password'
                  name='password'
                  id='inputPassword'
                  placeholder='password'
                />
                <Field
                  type='text'
                  name='address'
                  id='inputAddress'
                  placeholder='address'
                />
                <button id='submitButton' type='submit'>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(register)
