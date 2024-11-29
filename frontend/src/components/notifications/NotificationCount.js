import axios from "axios";
import { useEffect, useState } from "react";
import SummaryApi from "../../common";

function NotificationCount({ markRead }) {
	const [countNotification, setCountNotification] = useState();

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

	return (
		<div className="absolute bottom-2 left-2 bg-red-600 px-1.5 text-white text-sm font-medium rounded-full">
			{countNotification}
		</div>
	);
}

export default NotificationCount;
