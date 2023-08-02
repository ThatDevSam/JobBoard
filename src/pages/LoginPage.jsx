import {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import {useLoginUserMutation} from '../reduxStore/apiSlice'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTheme } from '@mui/material/styles'
import { setCurrentUser } from "../reduxStore/userSlice";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

import {
  TextField,
  Container,
  Box,
  Grid,
  Button,
  InputAdornment,
  Typography,
} from '@mui/material'

const Login = () => {

  //Import the theme from the global theme provider.
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  
  //This calls the api mutation, so that the mutation trigger, data object, and api request state hooks are available.
  const [
    loginUser, //mutation trigger
    {
      data,
      error,
      isLoading,
      isSuccess,
      isError
    }
  ] = useLoginUserMutation()

  //Update state with the value of the input. 
  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})  
  }

  //Check that all inputs are present, submit if they are, show a toast error if they are not.
  const handleInputValidation = (e) => {
    e.preventDefault()
    if(!userInfo.email || !userInfo.password){
      toast.error('Please Fill Out All Fields');
    } else {
      handleSubmit(e)
    }
  }

  //Send the info to the api
  const handleSubmit = (e) => {
    e.preventDefault()
    //Pass the user info to redux to be sent to the api
    loginUser({
      email: userInfo.email, 
      password: userInfo.password, 
    } )
    handleClear(e)
  }

  useEffect(() => {
    if(isSuccess){
      //Set the new user's name, id, and role in the redux store.
      dispatch(setCurrentUser(data.user.userInfo))
      //navigate to new page.
      // navigate('/dashboard')
    } else if(isError){
      //Show the server error message to the user.
      toast.error(error.data.msg)
    }
  }, [isSuccess, isError])
 
  //Clear all search fields. 
  const handleClear = (e) => {
    e.preventDefault()
    setUserInfo({
        email: '',
        password: '',
    })
  }
    return (
      <form style={{background: theme.palette.green.light, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>     
        <Container maxWidth='sm'  sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <Box sx={{ flexGrow: 1, mt: 9, display: 'flex', justifyContent: 'center', alignContent: 'center', bgcolor: 'white', borderRadius: '15px', padding: 5, mb: 9}}>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
              {/* Brand Name */}
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: 1}}>
                <Typography variant="h3">
                  Job Board
                </Typography>
              </Grid>
              {/* Login/register heading */}
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <Typography variant="h5" sx={{color: theme.palette.green.main, fontWeight: 'bold'}}>
                  Login
                </Typography>
                
              </Grid>

              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: 1}}>
                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                    Don't have an account? <Link to={'/register'} style={{color: theme.palette.green.main}}>Sign up today!</Link>
                </Typography>
              </Grid>
              
                
                <Grid item xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="email" 
                      label="Email" 
                      name="email"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="CarterLopez@gmail.com"
                      value={userInfo.email}
                      onChange={handleChange}
                      required={true}
                      sx={{width: {xs: '75%', sm: '50%'}}}
                    />
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                  <TextField 
                      id="password" 
                      label="Password" 
                      name="password"
                      variant="outlined" 
                      helperText="Required" 
                      type="password"
                      value={userInfo.password}
                      onChange={handleChange}
                      required={true}
                      sx={{width: {xs: '75%', sm: '50%'}}}
                       //Set error to true if the zip value is greater than 5.
                       error={((userInfo.password && userInfo.password.length < 8) ? true : false)}
                       InputProps={{
                         endAdornment: ( 
                           //If the condition is true show the icon, else show nothing.
                           (userInfo.password && userInfo.password.length < 8) ? 
                           (<InputAdornment position="end">
                             <PriorityHighIcon color="warning" />
                           </InputAdornment>)
                           :
                           ''
                         ),
                       }}
                    />
                </Grid>

                <Grid item  xs={12} display="flex" justifyContent="center" alignItems="center" mb={3}>
                  {/* register button */}
                  <Button 
                    onClick={handleInputValidation} 
                    variant="contained" 
                    size={"large"} 
                    aria-label="Submit" 
                    sx={{marginRight: 3, fontSize: 19, fontWeight: 'bold', bgcolor: theme.palette.green.main, marginTop: 3, ":hover":{bgcolor: "white", color: theme.palette.green.main,borderColor: 'inherit', border: 'solid'}}}
                  >
                    Register
                  </Button>
                  {/* Clear button */}
                  <Button 
                    onClick={handleClear} 
                    variant="outlined" 
                    aria-label="clear" 
                    sx={{ color: 'grey', borderColor: "grey", fontWeight: 'bold', marginTop: 3, ":hover":{bgcolor: "white", color: theme.palette.green.main, borderColor: 'inherit', border: 'solid'}}}
                  >
                    <Typography>Clear</Typography> 
                  </Button>                  
                </Grid>
              </Grid>
          </Box>
        </Container>
        
        
      
      </form>
    )
  }
  
  export default Login