import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginWithCredentials } from "./AuthSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { validateForm } from "../../Components/ValidateForm";
import "../../style.css";
import { Loader } from "../../Components/Loader";
export const Login = () => {
	const auth = useSelector((state) => state.auth.login);
	const loader = useSelector((state) => state.auth.loader);
	const { token } = auth;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [errorMessage, setErrorMessage] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (token) {
			navigate("/home");
		}
	}, [token, navigate]);
	const submitHandler = (e) => {
		e.preventDefault();
		validateForm({ email, password, setErrorMessage }) &&
			dispatch(LoginWithCredentials({ email, password }));
	};

	return (
		<div className="login">
			{!loader ? (
				<form
					onSubmit={submitHandler}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						margin: "3rem auto 2rem auto",
						padding: "4rem",
						border: "2px solid #f0f0f0",
						width: "20rem",
					}}
				>
					<h2>Login</h2>
					<TextField
						id="standard__basic"
						label="Email"
						type="text"
						name="email"
						helperText="Enter your email here"
						onChange={(e) => setEmail(e.target.value)}
						required
						value={email}
					/>

					<br />
					<br />

					<TextField
						id="standard__basic"
						label="Password"
						type="password"
						name="password"
						helperText="Enter your password here"
						onChange={(e) => setPassword(e.target.value)}
						required
						value={password}
					/>

					<div className="name__error">
						{errorMessage !== "" && errorMessage}
					</div>
					<br />
					{/*Login button*/}
					<input type="submit" value="LOGIN" id="login__btn__outlined" />
					<button
						onClick={() =>
							dispatch(
								LoginWithCredentials({
									email: "a@gmail.com",
									password: "12345678",
								})
							)
						}
						id="login__btn__outlined"
						style={{ margin: "1rem 0" }}
					>
						Guest Login
					</button>
					<p>
						<NavLink
							style={{
								textDecoration: "none",
								color: "black",
							}}
							to="/signup"
						>
							Create an account
						</NavLink>
					</p>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};
