import {Box,Skeleton} from "@mui/material";

const LoadingTable = () => {
  return (
    <Box sx={{ m: 4 }}>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton sx={{mt:3}} variant="rectangular" height={300} />
    </Box>
  )
}

export default LoadingTable;