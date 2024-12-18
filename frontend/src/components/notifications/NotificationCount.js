import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SummaryApi from "../../common";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const socket = io("http://localhost:8080");

function NotificationCount({ markRead }) {
	const [countNotification, setCountNotification] = useState();
	const { userData } = useContext(AuthContext);

	const getNotificationUnread = async () => {
		try {
			const response = await axios.get(
				SummaryApi.countNotificationUnread.url
			);

			if (response.data.success) {
				setCountNotification(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getNotificationUnread();
	}, [markRead]);

	useEffect(() => {
		socket.emit("register", userData.id);

		socket.on("notification", (data) => {
			setCountNotification((prev) => prev + 1);
			if (data.type === "LIKE") {
				toast.info(`User ${data.issuerName} like your post`);
			} else if (data.type === "COMMENT") {
				toast.info(`User ${data.issuerName} comment on your post`);
			} else if (data.type === "FOLLOW") {
				toast.info(`User ${data.issuerName} follow you`);
			}
		});
		return () => {
			socket.disconnect();
		};
	}, [socket]);
	return (
		<div
			className="absolute bottom-2 left-2 bg-red-600 px-1.5 text-white text-sm font-medium rounded-full"
			style={{ userSelect: "none" }}
		>
			{countNotification}
		</div>
	);
}

export default NotificationCount;
