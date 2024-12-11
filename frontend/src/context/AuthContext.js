import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../common/constants";
import setAuthToken from "../utils/auth/setAuthToken";
import axios from "axios";
import SummaryApi from "../common";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		id: "",
		username: "",
		email: "",
		password: "",
		role: "",
		avatar: "",
	});
	const [title, setTitle] = useState("Home");
	const [redirectPath, setRedirectPath] = useState(null);

	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
			try {
				const response = await axios.get(SummaryApi.getDetailsUser.url);

				if (response.data.success) {
					// console.log(response.data.user);
					setUserData(response.data.user);
				}
			} catch (err) {
				console.error("Error loading user", err);
				localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			}
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const [infoForm, setInfoForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	return (
		<AuthContext.Provider
			value={{
				title,
				setTitle,
				loadUser,
				userData,
				setUserData,
				infoForm,
				setInfoForm,
				redirectPath,
				setRedirectPath,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
