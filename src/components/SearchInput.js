import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	FormHelperText,
	Alert,
	LinearProgress,
	Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitInput } from "../service/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup
	.object({
		projectName: yup
			.string()
			.min(4, "Must be more than 3 characters")
			.required("This field is required"),
		scanningMode: yup.string().required("This field is required"),
		scanDimensionsX: yup
			.number()
			.min(1, "Must be 1 or larger")
			.integer("Must be an integer")
			.typeError("Must be a number")
			.required("This field is required"),
		scanDimensionsY: yup
			.number()
			.min(1, "Must be 1 or larger")
			.integer("Must be an integer")
			.typeError("Must be a number")
			.required("This field is required"),
		scannerFrequency: yup
			.number()
			.min(1, "Must be 1 or larger")
			.test("is-decimal",
			"Must be maximum 1 decimal point value",
			(val) => {
			  if (val !== undefined) {
				return /^(\d)*(\.)?([0-9]{1})?$/.test(val);
			  }
			  return true;})
			.typeError("Must be a number or decimal")
			.required("This field is required")
			,
	})
	.required();

const SearchInput = () => {
	const { mutate } = useSubmitInput();
	const [errorStatus, setErrorStatus] = useState();
	const [isSending, setIsSending] = useState(false);
	
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		setIsSending(true);
		//console.log(data);

		//console.log("form errors:", errors);

		mutate(data, {
			onSuccess: (res) => {
				axios.get("https://wavescan-internship.saurabhmudgal.repl.co/success").then((resp) => {
					var scData = resp.data.map((row,i)=>{
						row.id=i
						return row
					})
					console.log(resp.data)
					navigate("/result",{state: {scannerData: scData}});
					
				})
				setIsSending(false);
			},
			onError: (error) => {
				setIsSending(false);
				setErrorStatus(error.response.data);
			},
		});
	};
	//console.log("form errors:", errors.projectName);

	const scanOpts = ["Gantry", "Crawler", "Auto", "Manual", "Arm"];

	useEffect(()=>{
		window.history.replaceState({}, document.title)
	})

	return (
		<Card>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							<Controller
								name={"projectName"}
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value="" } }) => (
									<TextField
										fullWidth
										data-testid="tf-projectName"
										id="projectName"
										error={errors.projectName!==undefined}
										onChange={onChange}
										value={value}
										label={"Project Name"}
										helperText={
											errors.projectName &&
											errors.projectName.message
										}
									/>
								)}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<FormControl fullWidth error={errors.scanningMode!==undefined}>
								<InputLabel id={"scanningMode-select-label"}>
									Scanning Mode
								</InputLabel>
								<Controller
									name={"scanningMode"}
									control={control}
									rules={{ required: true }}
									render={({
										field: { onChange, value="" },
									}) => (
										<Select
											id="scanningMode"
											data-testid ="scanningMode"
											labelId="scanningMode-label"
											value={value}
											defaultValue={scanOpts[0].toUpperCase()}
											label="Scanner Mode"
											onChange={onChange}
										>
											{scanOpts.map((scOpt, i) => (
												<MenuItem
													key={i}
													value={scOpt.toUpperCase()}
												>
													{scOpt}
												</MenuItem>
											))}
										</Select>
									)}
								/>
								{errors.scanningMode && (
									<FormHelperText>
										{errors.scanningMode.message}
									</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12}>
							<Controller
								name={"scanDimensionsX"}
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value="" } }) => (
									<TextField
										label="Scan DimensionX(cm)"
										id="scanDimensionsX"
										fullWidth
										error={errors.scanDimensionsX!==undefined}
										helperText={
											errors.scanDimensionsX &&
											errors.scanDimensionsX.message
										}
										onChange={onChange}
										value={value}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													x
												</InputAdornment>
											),
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<Controller
								name={"scanDimensionsY"}
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value="" } }) => (
									<TextField
										label="Scan DimensionY(cm)"
										id="scanDimensionsY"
										fullWidth
										error={errors.scanDimensionsY!==undefined}
										helperText={
											errors.scanDimensionsY &&
											errors.scanDimensionsY.message
										}
										onChange={onChange}
										value={value}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													y
												</InputAdornment>
											),
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<Controller
								name={"scannerFrequency"}
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value="" } }) => (
									<TextField
										fullWidth
										error={errors.scannerFrequency!==undefined}
										onChange={onChange}
										id="scannerFrequency"
										value={value}
										label={"Scanner Frequency (GHz)"}
										helperText={
											errors.scannerFrequency &&
											errors.scannerFrequency.message
										}
									/>
								)}
							/>
						</Grid>

						<Grid item container justifyContent="space-between">
							<Grid item xs={9} md={4}>

								<Button
									data-testid="submitButton"
									fullWidth
									variant="contained"
									type="submit"
								>
									Scan
								</Button>
							</Grid>
							{errorStatus && (
								<Grid item xs={12} md={6}>
									<Alert severity="error">
										{errorStatus}
									</Alert>
								</Grid>
							)}
						</Grid>
						{isSending && (
							<Grid item md={12}>
								<Box sx={{ width: "100%" }} data-testid="loading">
									<LinearProgress data-testid="loadingBar"/>
								</Box>
							</Grid>
						)}
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SearchInput;
