jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => ({
		state: {
			scannerData: [
				{
                    id:"0",
					scannerName: "Scanner 4",
					ipAddress: "126.0.2.1",
					scannerSpeed: "20",
					isAvailable: "true",
				},
				{
                    id:"1",
					scannerName: "Scanner 5",
					ipAddress: "127.0.2.1",
					scannerSpeed: "30",
					isAvailable: "false",
				},
			],
		},
		isLoading: false,
		isFetching: false,
		isError: false,
	}),
}));

import ResultTable from "./ResultTable";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

describe("Table renders correctly", () => {
	test("renders with correct rows and data", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ResultTable />
				</BrowserRouter>
			</QueryClientProvider>
		);
		var dataRows = await screen.findAllByRole("row");
		expect(dataRows[2].textContent).toContain("Scanner 5");
        expect(dataRows[2].textContent).toContain("127.0.2.1");
        expect(dataRows[2].textContent).toContain("30");
		expect(dataRows.length).toBe(3); //includes table header
	});
});
