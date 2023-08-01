import {
    Snackbar,
    Alert,
  } from '@mui/material'


const Toast = (props) => {
    {console.log(props)}
    {/* Toast Noficiation */}
    <Snackbar open={props.snackBarOpen} autoHideDuration={4000} onClose={props.handleSnackBarClose}>
        <Alert onClose={props.handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
        Please make sure you filled out all fields.
        </Alert>
    </Snackbar>     
}

export default Toast