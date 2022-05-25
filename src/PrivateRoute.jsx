import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = ({ children }) => {
	const login = useSelector((state) => state.auth.login);
	const { isUserLoggedIn } = login;
	return isUserLoggedIn ? children : <Navigate to="/" />;
};
