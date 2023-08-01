import { Link } from 'react-router-dom';
import main from '../assets/images/LandingImage.jpg';
import{
    Typography,
    Box, 
    Grid,
    Button,
    AppBar,
    Container
} from '@mui/material'

const Landing = () => {
  return (
    <>
    <Container maxWidth='lg' sx={{}}>
    <AppBar position='static' sx={{padding: 1, bgcolor: 'inherit', boxShadow: 'none'}}>
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" >
        <Grid item>
          <Typography variant='h4' sx={{color: 'black'}}>Job Board</Typography>
        </Grid>
        <Grid item>
          <Link to={'/register'}>
            <Button variant="contained">Login / Register</Button>
          </Link>
          
        </Grid>
      </Grid>
    </AppBar>
        
      <Box sx={{ flexGrow: 1, minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid container spacing={2} >
            <Grid container item md={6} sx={{marginLeft: 9}}>
                <Grid item>
                    <Typography variant='h3' sx={{fontWeight: 'bold',}}>Job Tracking App</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' sx={{marginBottom: 4, marginTop: 4, paddingRight: 8}}>
                    Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
                    fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
                    crucifix heirloom meggings bicycle rights. Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
                    fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
                    crucifix heirloom meggings bicycle rights.
                  </Typography>
                </Grid>
                <Grid>
                    <Link to={'/register'}>
                      <Button variant="contained">Login / Register</Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid item md={5} sx={{}}>
                <img src={main} alt='business meeting' style={{width: '100%', display: 'block', objectFit: 'cover'}}/>
            </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
};

export default Landing;