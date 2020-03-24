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
    DELETE_PRODUCT_ERROR
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
