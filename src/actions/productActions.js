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
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESFULLY,
    EDIT_PRODUCT_ERROR

} from '../types'
import clientAxios from '../config/axios'
import swal from 'sweetalert';



//ADDING PRODUCTS
export function createNewProductAction(product) {
    return async (dispatch) => {
        dispatch(addProduct())
        try {
            await clientAxios.post('/products.json', product)
            dispatch(addProductSuccesfully(product))

            //MESSAGE
            swal("Excellent", "The product has been added succesfully", "success");

        } catch (error) {
            dispatch(addProductError(true))

            //MESSAGE
            swal({
                title: "An error has occurred",
                text: "Please try again",
                icon: "error",
            });
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})

const addProductSuccesfully = product => ({
    type: ADD_PRODUCT_SUCCESFULLY,
    payload: product
})

const addProductError = status => ({
    type: ADD_PRODUCT_ERROR,
    payload: status
})



//GETTING THE PRODUCTS
export function getProductsAction() {
    return async (dispatch) => {
        dispatch(getProducts())
        try {
            const response = await clientAxios.get('/products.json')
            const result = response.data
            const loadedProducts = []

            for (const key in result) {
                loadedProducts.push({
                    id: key,
                    name: result[key].name,
                    price: result[key].price,
                })
            }
            dispatch(getProductsSuccesfully(loadedProducts))
        } catch (error) {
            dispatch(getProductsError(true))
        }
    }
}

const getProducts = () => ({
    type: GET_PRODUCTS,
    payload: true
})

const getProductsSuccesfully = products => ({
    type: GET_PRODUCTS_SUCCESFULLY,
    payload: products
})

const getProductsError = status => ({
    type: GET_PRODUCTS_ERROR,
    payload: status
})



//DELETE PRODUCT
export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch(deleteProduct(id))

        try {
            await clientAxios.delete(`/products/${id}.json`)
            dispatch(deleteProductSuccesfully())
            swal("Poof! Your product has been deleted!", {
                icon: "success",
            });
        } catch (error) {
            dispatch(deleteProductError(true))
        }
    }
}


const deleteProduct = id => ({
    type: DELETE_PRODUCT,
    payload: id
})

const deleteProductSuccesfully = () => ({
    type: DELETE_PRODUCT_SUCCESFULLY
})

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
})



//GET PRODUCT TO EDIT
export function getEditProductAction(product) {
    return (dispatch) => {
        dispatch(getProductEdit(product))
    }
}

const getProductEdit = product => ({
    type: GET_EDIT_PRODUCT,
    payload: product
})

//EDIT PRODUCT
export function editProductAction(product) {
    return async (dispatch) => {
        dispatch(editProduct(product))
        try {
            await clientAxios.put(`/products/${product.id}.json`, product)
            dispatch(editProductSuccesfully(product))

            //MESSAGE
            swal("Excellent", "The product has been edited succesfully", "success");
        } catch (error) {
            dispatch(editProductError(true))
        }
    }
}

const editProduct = () => ({
    type: EDIT_PRODUCT
})

const editProductSuccesfully = product => ({
    type: EDIT_PRODUCT_SUCCESFULLY,
    payload: product
})

const editProductError = status => ({
    type: EDIT_PRODUCT_ERROR,
    payload: status
})