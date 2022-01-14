import { useNavigate } from "react-router-dom";
import styles from "./Products.module.css"
import { useDispatch } from "react-redux";
import { deleteProductAction, getEditProductAction } from "../actions/productActions";
import swal from 'sweetalert'


const Products = ({products}) => {

    //NAVIGATE REDIRECT
    let navigate = useNavigate();

    const dispatch = useDispatch()

    const confirmProductDelete = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch( deleteProductAction(id) )
            } else {
              swal("Your product is safe!");
            }
          }); 
    }

    const redirectEdition = product => {
        dispatch(getEditProductAction(product))
        navigate(`/product/edit/${product.id}`)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>        
                    {products.length !== 0 && (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button type="button" className={styles.edit} onClick={ () => redirectEdition(product)}>
                                        Edit
                                    </button>
                                    <button type="button" className={styles.delete} onClick={ () => confirmProductDelete(product.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {products.length === 0 && <div className={styles.error}>There arent any products to show</div>}
        </>
    )
}

export default Products
