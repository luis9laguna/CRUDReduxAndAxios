import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Index from './pages'
import EditProduct from './pages/EditProduct'
import NewProduct from './pages/NewProduct'
import { Provider } from'react-redux'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path ="/" element={<Layout />}>
          <Route index element={<Index />}/>
          <Route path ="/product/new" element={<NewProduct />}/>
          <Route path ="/product/edit/:id" element={<EditProduct />}/>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
