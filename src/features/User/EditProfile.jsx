import { UserDetails } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./User.css";
import { Loader } from "../../Components/Loader";
export const EditProfile = () => {
	const [imgUrl, setUrl] = useState("");
	const [username, setName] = useState("");
	const [bio, setBio] = useState("");
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth.login);
	const [loader, setLoader] = useState(false);
	const userHandler = async () => {
		await dispatch(UserDetails({ username, bio, imgUrl, token }));
		setName("");
		setBio("");
	};
	// upload image
	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "e2pkko9m");
		try {
			setLoader(true);
			const response = await axios.post(
				"https://api.cloudinary.com/v1_1/dzvkso0q0/image/upload",
				data
			);

			setUrl(response.data.url);
			setLoader(false);
		} catch (err) {
			console.log(err.response);
		}
	};
	return (
		<div className="edit__profile__container">
			<div className="edit__profile">
				Edit Profile
				{!loader ? (
					<>
						{imgUrl && (
							<div className="createpost-uploaded-img-div">
								<img
									className="createpost-img-show"
									src={imgUrl}
									width="300px"
									alt="userpic"
								/>
							</div>
						)}
					</>
				) : (
					<Loader />
				)}
				<div className="upload">
					<label htmlFor="upload__btn">
						<span
							style={{
								cursor: "pointer",

								borderRadius: "4px",
								padding: "0.45rem",
								backgroundColor: "black",
								color: "white",
								fontSize: "0.8125rem",
								fontWeight: "500",
								letterSpacing: "0.02857em",
								fontFamily: "Roboto,Helvetica,Arial,sans-serif",
								minWidth: "64px",
							}}
						>
							UPLOAD
						</span>

						<input
							type="file"
							id="upload__btn"
							hidden
							onChange={uploadImage}
							name="Upload"
						/>
					</label>
					<Button
						size="small"
						variant="contained"
						id="btn__contained"
						onClick={userHandler}
					>
						{/* {user.status === 'fulfilled' ? 'Post' : 'Posting...'} */}
						Post
					</Button>
				</div>
				<TextField
					id="standard__basic"
					label="Name"
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={username}
					required
				/>
				<TextField
					id="standard__basic"
					label="Bio"
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={bio}
				/>
			</div>
		</div>
	);
};
