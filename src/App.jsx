import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material'
import { Provider } from 'react-redux'
import store from './reduxStore/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  Error, 
  Landing, 
  Register, 
  Dashboard,
  SharedLayout, 
  Login,
  ProtectedRoute
} from './pages';

function App() {

  let jobBoardTheme = createTheme({
    palette:{
      green:{
        light: '#a5d6a7',
        main: '#4caf50'
      }
      
    },
  });

  //This function will make all typography compnonents font responsive.
  jobBoardTheme = responsiveFontSizes(jobBoardTheme)

  return (
    <>
    <ThemeProvider theme={jobBoardTheme}>
      <Provider store={store}> 
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                  <SharedLayout />
              }
            >
              <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route path='landing' element={<Landing/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
            {/* Catch all path for the error page. */}
            <Route path='*' element={<Error/>}/>
          </Routes>
          <ToastContainer/>
        </BrowserRouter>
      </Provider>
      
    </ThemeProvider>
      
      
    </>
  )
}

export default App
