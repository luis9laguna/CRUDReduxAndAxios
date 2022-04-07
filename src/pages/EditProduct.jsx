import { useParams } from "react-router-dom"
import Form from "../components/Form"


const EditProduct = () => {
    const {id} = useParams()

    return (
            <>
            <Form id={id}/>
            </>
        )
}

export default EditProduct
