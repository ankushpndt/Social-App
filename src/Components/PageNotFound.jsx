import "./PageNotFound.css";
import ghost from "../assets/ghost.png";
export const PageNotFound = () => {
	return (
		<div className="page__not__found">
			<h1 className="page__not__found__heading">
				4
				<span>
					<img
						src={ghost}
						alt="ghost.png"
						style={{ width: "100%", maxWidth: "120px" }}
						className="ghost__image"
					/>
				</span>
				4
			</h1>
			<h2 className="page__not__found__heading__two">
				Error: 404 page not found
			</h2>
			<p className="page__not__found__content">
				Sorry, the page you're looking for cannot be accessed
			</p>
		</div>
	);
};
