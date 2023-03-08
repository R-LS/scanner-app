import { Alert, Grid,Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingTable from "./LoadingTable";

//mock data
// function createData(scannerName, ipAddress, scannerSpeed, isAvailable) {
// 	return { scannerName, ipAddress, scannerSpeed, isAvailable };
// }

// const rows = [
// 	createData("Crawler_Scanner", "127.0.5.1", 20, true),
// 	createData("Handheld_Scanner", "127.0.5.1", 32, true),
// 	createData("Handheld_Scanner", "127.0.5.1", 32, true),
// 	createData("Handheld_Scanner", "127.0.5.1", 32, true),
// 	createData("Handheld_Scanner", "127.0.5.1", 32, true),
// ];

export default function Results() {

	const {state,isFetching,isLoading, isError } = useLocation();

	const navigate = useNavigate();
    useEffect(() => {
		//console.log("hit useeffect")
        if (state == null) {
            navigate("/search")
        }
      }, [state])


	//console.log("data:", state);
	return (
		<Grid sx={{height:"90vh"}}
		container
		direction="row"
		justifyContent="center"
		alignItems="center">
			<Grid item xs={12} md={9} lg={8}>
				{isLoading || isFetching ||!state ? (
					<LoadingTable />
				) : isError ?  (
					<Alert severity="error">
						An error has occurred while trying to load the data.
					</Alert>
				) : (
					<TableContainer component={Paper}>
					  <Alert severity="info">Showing {state.scannerData.length} results</Alert>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead >
								<TableRow>
									<TableCell >Project Name</TableCell>
									<TableCell>IP Address</TableCell>
									<TableCell>
										Scanner Speed
									</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{state.scannerData &&
									state.scannerData.map((row, i) => (
										<TableRow
											key={i}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}
										>
											<TableCell component="th" scope="row">
												{row.scannerName}
											</TableCell>
											<TableCell >
												{row.ipAddress}
											</TableCell>
											<TableCell >
												{row.scannerSpeed}
											</TableCell>
											<TableCell >
												{row.isAvailable ? (
													<Chip label="Available" color="success" variant="outlined" />
												) : (
													<Chip label="Engaged" color="warning" variant="outlined" />
												)}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Grid>
		</Grid>
	);
}
