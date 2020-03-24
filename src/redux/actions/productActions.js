import {
    FETCH_PRODUCTS,
    ADD_PRODUCT_PENDING,
    ADD_PRODUCT_SUCCES,
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

