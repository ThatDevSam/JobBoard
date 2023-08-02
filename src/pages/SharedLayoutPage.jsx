
// import Footer from '../components/footerComponent'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavComponent'

function SharedLayout() {

    return (
      <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </>
    )
  }
  
  export default SharedLayout