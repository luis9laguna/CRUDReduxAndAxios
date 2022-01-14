import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESFULLY,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESFULLY,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESFULLY,
    DELETE_PRODUCT_ERROR,
    GET_EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESFULLY,
    EDIT_PRODUCT_ERROR

} from '../types'

const initialState = {
    products: [],
    error: null,
    loading: false,
    productDelete: null,
    productEdit: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESFULLY:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }

        case ADD_PRODUCT_ERROR:
        case GET_PRODUCTS_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_PRODUCTS_SUCCESFULLY:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload,
                productEdit: null
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                productDelete: action.payload
            }

        case DELETE_PRODUCT_SUCCESFULLY:
            return {
                ...state,
                products: state.products.filter(product => product.id !== state.productDelete),
                productDelete: null
            }

        case GET_EDIT_PRODUCT:
            return {
                ...state,
                productEdit: action.payload
            }

        case EDIT_PRODUCT_SUCCESFULLY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? product = action.payload : product
                )
            }

        default:
            return state
    }
}