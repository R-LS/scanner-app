import { Grid, Typography } from "@mui/material"

const ErrorBoundary = () => {
  return (

            <Grid container sx={{height:"100vh", p:5}}
            direction="column"
                    justifyContent="center"
                    alignItems="center">

                    <img
                    alt="Under development"
                    src="undraw_page_not_found_su7k.svg"
                    style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 560
                    }}
                    />
                    <Typography variant="h3">
                        Oops. The page you are looking for can't be found.
                    </Typography>

            </Grid>
    
  )
}

export default ErrorBoundary