import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, Grid, Alert } from '@mui/material';
import LoadingTable from './LoadingTable';



const columns = [
  { field: 'scannerName', headerName: 'Scanner Name',flex:1},
  { field: 'ipAddress', headerName: 'IP Address',flex:1},
  { field: 'scannerSpeed', headerName: 'Scanner Speed',flex:1},
  { field: 'isAvailable', headerName: 'Status',
  renderCell: (params) => (
    <Chip label={params.value==="true"?"Available":"Engaged"} color={params.value==="true"?"success":"warning"} variant="outlined" />
  ),},
];

export default function ResultTable() {

    const {state,isFetching,isLoading, isError } = useLocation();
    

    const navigate = useNavigate();
    useEffect(() => {
        //console.log("hit useeffect")
        if (state == null) {
            navigate("../search")
        }
    }, [state,navigate])

  return (
    <Grid sx={{height:"90vh"}}
		container
		direction="row"
		justifyContent="center"
		alignItems="center">
			<Grid item xs={12} md={9} lg={8} sx={{height:"60vh"}}>
				{isLoading || isFetching ||!state ? (
					<LoadingTable />
				) : isError ?  (
					<Alert severity="error">
						An error has occurred while trying to load the data.
					</Alert>
				) : (
    <>
        <Alert severity="info">Showing {state.scannerData.length} results</Alert>
        <DataGrid sx={{p:3}}
            rows={state.scannerData}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
          />
    </>)}
      </Grid>
    </Grid>
  );
}