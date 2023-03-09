import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter, Navigate, Route,
  Routes
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ResultTable from "./components/ResultTable";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Search from "./Search";

const queryClient = new QueryClient();

let theme = createTheme({
	components: {
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& .MuiTableCell-root": {
						fontWeight: 600,
					},
				},
			},
		},
	},
});


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
        <Routes>
        <Route path="/scanner-app/" element={<Navigate to="/scanner-app/search" />} />
      <Route path="/scanner-app/" element={<Layout />} >
			<Route path="search" element={<Search />} />
			<Route path="result" element={<ResultTable />} />
      <Route path="*" element={<ErrorBoundary/>}/>
      </Route>
      </Routes>
        </BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
