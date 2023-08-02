import {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import {useCreateUserMutation} from '../reduxStore/apiSlice'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTheme } from '@mui/material/styles'
import { setCurrentUser } from "../reduxStore/userSlice";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import {
  TextField,
  Container,
  Box,
  Grid,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

const Register = () => {

  //Import the theme from the global theme provider.
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    firstName: 'eee',
    lastName: 'eee',
    email: 'egddful@gmail.com',
    address:{
      state: 'ca',
      city: 'eee',
      zip: '12345',
      streetAdd: '1st street'
    },    
    password: '12345678',
    role: 'individual',
    companyName: '',
  })
  
  //This calls the api mutation, so that the mutation trigger, data object, and api request state hooks are available.
  const [
    createUser, //mutation trigger
    {
      data,
      error,
      isLoading,
      isSuccess,
      isError
    }
  ] = useCreateUserMutation()

  //Update state with the value of the input. 
  const handleChange = (e, nestedProperty) => {
    if(!nestedProperty){
      setUserInfo({...userInfo, [e.target.name]: e.target.value})
    } else{
      //This enables the function to update the nested properties of the userInfo state.
      setUserInfo({...userInfo, [nestedProperty]:{...userInfo[nestedProperty],[e.target.name]: e.target.value}})
    }    
  }

  //Check that all inputs are present, submit if they are, reset the field if they are not.
  const handleInputValidation = (e) => {
    e.preventDefault()
    if(!userInfo.email || !userInfo.firstName || !userInfo.lastName || !userInfo.address.state || !userInfo.address.city || !userInfo.address.zip || !userInfo.address.streetAdd || !userInfo.password){
      toast.error('Please Fill Out All Fields');
    } else {
      handleSubmit(e)
    }
  }

  //Send the info to the api
  const handleSubmit = (e) => {
    e.preventDefault()
    //Pass the user info to redux to be sent to the api
    createUser({
      name:`${userInfo.firstName} ${userInfo.lastName}`,
      email: userInfo.email, 
      password: userInfo.password, 
      role: userInfo.role, 
      address: userInfo.address,
      companyName: userInfo.companyName
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        address:{
          state: '',
          city: '',
          zip: '',
          streetAdd: '',
        }
    })
  }
    return (
      <form style={{background: theme.palette.green.light}}>     
        <Container  sx={{maxWidth: {xs: 'xs', sm: 'md'}, display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
          <Box sx={{ flexGrow: 1, mt: 5, display: 'flex', justifyContent: 'center', alignContent: 'center', bgcolor: 'white', borderRadius: '15px', padding: 5, mb: 5}}>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
              {/* Brand Name */}
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: 1}}>
                <Typography variant="h3">
                  Job Board
                </Typography>
              </Grid>
              {/* Login/register heading */}
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: 3}}>
                <Typography variant="h5" sx={{color: theme.palette.green.main, fontWeight: 'bold'}}>
                  Register
                </Typography>
              </Grid>
                <Grid item xs={12} sm={4}  sx={{display: 'flex', justifyContent: 'center', alignContent: 'start' }}>
                    <TextField 
                        id="First Name" 
                        label="First Name" 
                        name="firstName"
                        variant="outlined" 
                        helperText="Required" 
                        placeholder="Carter"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        required={true}
                      />
                </Grid>
                <Grid item xs={12} sm={4}  sx={{display: 'flex', justifyContent: 'center', alignContent: 'start' }}>
                <TextField 
                      id="Last Name" 
                      label="Last Name" 
                      name="lastName"
                      variant="outlined" 
                      helperText="Required"
                      required={true}
                      placeholder="Lopez"
                      value={userInfo.lastName}
                      onChange={handleChange}
                    />
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
                      id="streetAdd" 
                      label="Street Address" 
                      name="streetAdd"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="123 N 27th Street"
                      value={userInfo.address.streetAdd}
                      onChange={(e) => {handleChange(e, 'address')}}
                      required={true}
                      sx={{width: {xs: '75%', sm: '50%'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={2} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="state" 
                      label="State" 
                      name="state"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="CA"
                      value={userInfo.address.state}
                      onChange={(e) => {handleChange(e, 'address')}}
                      required={true}
                      //Set error to true if the state value is greater than 2.
                      error={((userInfo.address.state && userInfo.address.state.length > 2) ? true : false)}
                      InputProps={{
                        endAdornment: ( 
                          //If the condition is true show the icon, else show nothing.
                          (userInfo.address.state && userInfo.address.state.length > 2) ? 
                          (<InputAdornment position="end">
                            <PriorityHighIcon color="warning" />
                          </InputAdornment>)
                          :
                          ''
                        ),
                      }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="city" 
                      label="City" 
                      name="city"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="Los Angeles"
                      value={userInfo.address.city}
                      onChange={(e) => {handleChange(e, 'address')}}
                      required={true}
                    />
                </Grid>
                <Grid item xs={12} sm={3} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="zip" 
                      label="Zip" 
                      name="zip"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="12345"
                      value={userInfo.address.zip}
                      onChange={(e) => {handleChange(e, 'address')}}
                      required={true}
                      //Set error to true if the zip value is greater than 5.
                      error={((userInfo.address.zip && (userInfo.address.zip.length > 5) ) ? true : false)}
                      InputProps={{
                        endAdornment: ( 
                          //If the condition is true show the icon, else show nothing.
                          (userInfo.address.zip && (userInfo.address.zip.length > 5) ) ? 
                          (<InputAdornment position="end">
                            <PriorityHighIcon color="warning" />
                          </InputAdornment>)
                          :
                          ''
                        ),
                      }}
                    />
                </Grid>
                
                <Grid item xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="password" 
                      label="Password" 
                      name="password"
                      variant="outlined" 
                      helperText="Required, minimum of 8 characters." 
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

                <Grid item xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                <FormControl>
                  <FormLabel id="userRole">Which are you?</FormLabel>
                  <RadioGroup
                    aria-labelledby="user-type"
                    defaultValue="individual"
                    name="role"
                    value={userInfo.role}
                    onChange={(e) => {handleChange(e, '')}}
                  >
                    <FormControlLabel value="individual" control={<Radio /> } label="Individual" />
                    <FormControlLabel value="company" control={<Radio />} label="Company" />
                  </RadioGroup>
                </FormControl>
                </Grid>

                {/* Only show this field if the user select the company option from the radio group */}
                <Grid item xs={12} display={(userInfo.role == 'company' ? 'flex' : 'none')} justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="companyName" 
                      label="Company Name" 
                      name="companyName"
                      variant="outlined" 
                      helperText="Required"
                      placeholder="ACME Inc" 
                      value={userInfo.companyName}
                      onChange={handleChange}
                      required={true}
                      sx={{width: {xs: '75%', sm: '50%'}}}
                       //Set error to true if the zip value is greater than 5.
                       error={(!userInfo.companyName ? true : false)}
                       InputProps={{
                         endAdornment: ( 
                           //If the condition is true show the icon, else show nothing.
                           !userInfo.companyName ? 
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
                    sx={{marginRight: 3, fontSize: 19, fontWeight: 'bold', bgcolor: theme.palette.green.main, marginTop: 3, ":hover":{bgcolor: "white", color: theme.palette.violet.main,borderColor: 'inherit', border: 'solid'}}}
                  >
                    Register
                  </Button>
                  {/* Clear button */}
                  <Button 
                    onClick={handleClear} 
                    variant="outlined" 
                    aria-label="clear" 
                    sx={{ color: 'grey', borderColor: "grey", fontWeight: 'bold', marginTop: 3, ":hover":{bgcolor: "white", color: theme.palette.green.main,borderColor: 'inherit', border: 'solid'}}}
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
  
  export default Register