import { useParams } from "react-router-dom"
import Form from "../components/Form"


const EditProduct = () => {
    const {id} = useParams()

    return (
            <div>
            <Form id={id}/>
            </div>
        )
}

export default EditProduct
