import {
    FETCH_PRODUCTS,
    ADD_PRODUCT_PENDING,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    SET_SELECTED_PRODUCT_ID
 } from './types'
 import store from '../store'

 // FETCH PRODUCTS
 export const fetchProducts = () => dispatch => {
    fetch('http://localhost:5000/api/product')
        .then(res => res.json())
        .then(data => {
            return dispatch ({ type: FETCH_PRODUCTS, payload: data})
        })
}

// POST PRODUCTS 
export const postProduct = product => {
    return dispatch => {
        dispatch({
            type: ADD_PRODUCT_PENDING
        })
        const {
            users: { token }
        } = store.getState()
        const options = {
            timeout: 25000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `BEARER ${token}`
            },
            body: JSON.stringify(product)
        }
        console.log('options', options)
        return fetch('http://localhost:5000/api/product', options)
            .then( res => res.json())
            .then( data => {
                console.log('POST PRODUCT', data)
                if (!Object.entries(data).length) {
                    return Promise.reject(data)
                }
                return dispatch({
                    type: ADD_PRODUCT_SUCCESS,
                    payload: {
                        product: data
                    }
                })
            })
            .catch( error => {
                return dispatch ({
                    type: ADD_PRODUCT_ERROR,
                    payload: error
                })
            })
    }
}

// DELETE THE PRODUCTS
export const deleteProduct = code => {
    return dispatch => {
      dispatch({
        type: DELETE_PRODUCT_PENDING
      })
      const {
        users: { token }
      } = store.getState()
      const options = {
        timeout: 25000,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${token}`
        }
      }
      return fetch(`http://localhost:5000/api/product/${code}`, options)
        .then(res => res.json())
        .then(data => {
          console.log('DELETE PRODUCT', data)
          if (!Object.entries(data).length) {
            return Promise.reject(data)
          }
          return dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
          })
        })
        .catch(error => {
          return dispatch({
            type: DELETE_PRODUCT_ERROR,
            payload: error
          })
        })
    }
  }
  
// UPDATE PRODUCTS
export const updateProduct = product => {
    console.log(product)
    return dispatch => {
      dispatch({
        type: UPDATE_PRODUCT_PENDING
      })
      const {
        users: { token }
      } = store.getState()
      const options = {
        timeout: 25000,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${token}`
        },
        body: JSON.stringify({ ...product })
      }
      return fetch(`http://localhost:5000/api/product/${product._id}`, options)
        .then(res => res.json())
        .then(data => {
          console.log('UPDATE PRODUCT', data)
          if (!Object.entries(data).length) {
            return Promise.reject(data)
          }
          return dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: product
          })
        })
        .catch(error => {
          return dispatch({
            type: UPDATE_PRODUCT_ERROR,
            payload: error
          })
        })
    }
  }

//SET PRODUCT
export const setProductOnForm = _id => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_PRODUCT_ID,
      payload: _id
    })
  }
}