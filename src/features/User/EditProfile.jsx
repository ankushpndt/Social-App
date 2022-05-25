import { UserDetails } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./User.css";
import { Loader } from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
export const EditProfile = () => {
	const { token, userId } = useSelector((state) => state.auth.login);
	const allUsers = useSelector((state) => state.user.users.user);
	const currentUser = allUsers?.find((user) => user?._id === userId);
	const [imgUrl, setUrl] = useState(currentUser?.image);
	const [username, setName] = useState(currentUser?.name);
	const [bio, setBio] = useState(currentUser?.bio);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const userHandler = () => {
		dispatch(UserDetails({ username, bio, imgUrl, token })) &&
			navigate(`/account/${userId}`);
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
						Save
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
					onChange={(e) => setBio(e.target.value)}
					value={bio}
				/>
			</div>
		</div>
	);
};
