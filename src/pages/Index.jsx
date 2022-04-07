import Products from "../components/Products"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { getProductsAction } from "../actions/productActions"



const index = () => {

    //GETTING PRODUCTS
    const dispatch = useDispatch()

    useEffect(() => {
        
        const getProducts = () => dispatch(getProductsAction())
        getProducts()

    }, []);

    const products = useSelector(state => state.products.products);
    const error = useSelector(state => state.products.error);
    const loading = useSelector(state => state.products.loading);

    //STYLES
    const style = {
        display:'flex',
        flexDirection:"column",
        justifyContent:'center', 
        alignItems:'center',
    }

    const title = {
        fontSize: "2rem",
        marginTop: "2rem",
        color: "#111d33",
        fontWeight: "bold"
    }

    return (
        <a style={style}>
            <h2 style={title}>All The Products</h2>
            { error && <p>An Error Has Occurred</p> }
            {loading && <p>Loading...</p>}
            <Products products={products}/>
        </a>
    )
}

export default index
