import { useNavigate } from "react-router-dom";
import { SignUpWithCredentials } from "./AuthSlice";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../Components/ValidateForm";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../style.css";
import { Loader } from "../../Components/Loader";
export const SignUp = () => {
	const auth = useSelector((state) => state.auth.login);
	const loader = useSelector((state) => state.auth.loader);
	const { token } = auth;
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [showPass, setShowPass] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			navigate("/home");
		}
	}, [token, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		validateForm({ name, email, password, setErrorMessage }) &&
			dispatch(SignUpWithCredentials({ name, email, password }));
	};
	return (
		<div className="signup">
			{!loader ? (
				<form
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						margin: "1.5rem auto 0.5rem auto",
						padding: "4rem",
						border: "2px solid #f0f0f0",
						width: "20rem",
					}}
					onSubmit={submitHandler}
				>
					<h2 style={{ paddingBottom: "1rem" }}>Sign Up</h2>
					<TextField
						type="text"
						label="Name"
						name="fullName"
						helperText="Enter your name here"
						onChange={(e) => setName(e.target.value)}
						required
						value={name}
					/>

					<br />
					<TextField
						type="text"
						label="Email"
						name="email"
						helperText="Enter your email here"
						onChange={(e) => setEmail(e.target.value)}
						required
						value={email}
					/>
					<br />
					<TextField
						id="standard__basic"
						label="Password"
						type={showPass ? "text" : "password"}
						name="password"
						helperText="Enter your password here"
						onChange={(e) => setPassword(e.target.value)}
						required
						value={password}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPass(!showPass)}
										onMouseDown={(e) => e.preventDefault()}
										edge="end"
									>
										{showPass ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<br />
					<div className="name__error">
						{errorMessage !== "" && errorMessage}
					</div>
					<br />
					<input type="submit" value="SIGN UP" id="login__btn__outlined" />
					<p style={{ paddingTop: "1rem" }}>
						<NavLink
							style={{
								textDecoration: "none",
								color: "black",
							}}
							to="/"
						>
							Login instead
						</NavLink>
					</p>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};
