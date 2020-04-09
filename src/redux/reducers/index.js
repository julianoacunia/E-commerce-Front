import { combineReducers } from 'redux'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import loginReducer from './loginReducer'
import categorieReducer from './categorieReducer'

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    users: loginReducer,
    categories: categorieReducer
})