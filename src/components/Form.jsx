import { useState, useEffect } from 'react'
import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createNewProductAction, editProductAction } from "../actions/productActions"
import { useNavigate } from "react-router-dom";
import { hideAlertAction, showAlertAction } from '../actions/alertActions';

const Form = ({id}) => {

    //STATE
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    //DISPATCH
    const dispatch = useDispatch()

    //NAVIGATE REDIRECT
    let navigate = useNavigate();

    //GETTING THE VALUE OF LOADING AND ERROR
    const loading = useSelector( state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const alert = useSelector(state => state.alert.alert)
    
    
    //GETTING THE PRODUCT TO EDIT IF ITS NEEDED
    const editProduct = useSelector( state => state.products.productEdit)

    if(!editProduct && id){
        return null
    } 

    useEffect( () => {
        if (editProduct && id) {
            setName(editProduct.name)
            setPrice(editProduct.price)
        }
    },[editProduct])

    //HANDLE THE FORM
    const handlerSubmit = e => {
        e.preventDefault()

        if(name.trim() === "" || price <= 0){

            const alert = {
                msg: 'Both fields are necessary',
                styles: "styles.alert"
            }
            dispatch(showAlertAction(alert))

            return
        }

        dispatch( hideAlertAction())

        if(id){
            dispatch(editProductAction({
                name,
                price,
                id
            }))
        }else{
            dispatch(createNewProductAction({
                name,
                price 
            }))
        }

        setTimeout(() =>{
            navigate('/')
        }, 1000)

    }

    

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{id ? `Edit ${editProduct.name}` : 'Add A New Product'}</h2>

            {alert && <p className={eval(alert.styles)}> {alert.msg} </p>}

            <form className={styles.form} onSubmit={handlerSubmit}>
                <div className={styles.formDiv}>
                    <label htmlFor="name">Name</label>
                    <input 
                        placeholder="Name" 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.formDiv}>
                    <label htmlFor="price">Price</label>
                    <input placeholder="price" 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={price}
                        onChange={e => setPrice( Number(e.target.value))}/>
                </div>

                <button type='submit'>{id ? 'Edit' : 'Add'}</button>
            </form>

            {loading ? <p>Loading...</p> : null}
            {error ? <p>An error has occurred</p> : null}
        </div>
    )
}

export default Form
