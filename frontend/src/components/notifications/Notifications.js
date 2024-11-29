import axios from "axios";
import { useEffect, useState } from "react";
import SummaryApi from "../../common";
import Notification from "./Notification";

function Notifications({ setOpenNotification }) {
	const [notifications, setNotifications] = useState([]);

	const getAllNotificationByUser = async () => {
		try {
			const response = await axios.get(
				SummaryApi.getAllNotificationByUser.url
			);

			if (response.data.success) {
				setNotifications(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const markAsReadNotification = async () => {
		try {
			const response = await axios.post(
				SummaryApi.markAsReadNotification.url
			);
			if (response.data.success) {
				console.log("Open notification");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllNotificationByUser();
		setTimeout(() => {
			markAsReadNotification();
		}, 2000);
	}, []);

	return (
		<div className=" absolute -translate-y-1 bg-white rounded-lg p-2 -bottom-96 -left-52 shadow-md w-[25vw] min-h-[50vh] max-h-[50vh] overflow-y-scroll z-[1000]">
			{notifications.length > 0 ? (
				<>
					{notifications.map((notification, index) => (
						<Notification
							key={index}
							notification={notification}
							setOpenNotification={setOpenNotification}
						/>
					))}
				</>
			) : (
				<div className="text-center mt-[50%] text-xl -translate-y-[50%] text-gray-500 font-medium">
					No notifications yet!
				</div>
			)}
		</div>
	);
}

export default Notifications;
