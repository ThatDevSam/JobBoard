import { Link } from 'react-router-dom';
import notFoundImg from '../assets/images/not-found.svg';
import{
    Typography,
    Box, 
    Grid,
    Button,
    Container
} from '@mui/material'

const Error = () => {
    return(
        <> 
        <Container maxWidth='md' sx={{}}>
            <Box sx={{ flexGrow: 1, minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Grid item md={8} >
                        <img src={notFoundImg} alt='not found' style={{width: '100%', display: 'block', objectFit: 'cover'}}/>
                    </Grid>
                    <Grid  item md={8} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant='h6'>
                            Oops! How did you end up all the way out here?
                        </Typography>
                    </Grid>
                    <Grid item md={8} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to={'/Landing'}>
                            <Button variant='contained'> Home </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
            
        </>
    )
}

export default Error