import { Grid } from "@mui/material"
import SearchInput from "./components/SearchInput"

const Search = () => {
  return (
    
    <Grid
    sx={{height:"90vh"}}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
        <Grid item xs={12} md={6} lg={5}><SearchInput/></Grid>
    </Grid>
    
  )
}

export default Search