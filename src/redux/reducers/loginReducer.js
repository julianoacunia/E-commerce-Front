import {
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    IS_AUTH,
    USER_LOGOUT,
    ADD_USER_PENDING,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    FETCH_USERS
} from '../actions/types'

const initialState = {
    isAuth: false,
    users: [],
    error: null,
    isLoading: false,
    message: undefined,
    logged: false,
    token: '',
    failedLogin: false
}