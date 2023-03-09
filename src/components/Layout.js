import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from 'react-router-dom';


const Layout = () => {
  const navigate=useNavigate()
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WaveScan
          </Typography>
          <Button sx={{color:"white"}} onClick={()=>{navigate("/scanner-app/search")}} startIcon={<SearchIcon />}>
        Search
      </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    </>
  )
}

export default Layout