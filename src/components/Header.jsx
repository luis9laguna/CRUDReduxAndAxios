import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>  
           <h1><Link to="/">CRUD WITH REDUX AND AXIOS</Link></h1>
           <Link to="/product/new" className={styles.link}>
                    Add Product
           </Link>
        </header>
    )
}

export default Header
