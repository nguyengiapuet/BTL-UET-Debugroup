import { FaHeart, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserAvatar } from "../layout/Header";

export default function Notification({ notification, setOpenNotification }) {
	const notificationTypeMap = {
		FOLLOW: {
			message: `${notification?.issuerUsername} followed you`,
			icon: <FaUser className="size-3 text-white" />,
			href: `/info/${notification?.issuerUsername}`,
		},
		COMMENT: {
			message: `${notification?.issuerUsername} commented on your post`,
			icon: <MdMessage className="size-3 text-white" />,
			href: `/project-detail/${notification?.postId}`,
		},
		LIKE: {
			message: `${notification?.issuerUsername} liked your post`,
			icon: <FaHeart className="size-3 text-red-400" />,
			href: `/project-detail/${notification?.postId}`,
		},
	};

	const { message, icon, href } = notificationTypeMap[notification?.type];

	return (
		<Link
			to={href}
			onClick={() => setOpenNotification(false)}
			className="block pb-3"
		>
			<article
				className={`flex gap-3 items-center px-4 py-3 rounded-lg shadow-md transition-colors cursor-pointer 
    ${
		notification?.isRead === 1
			? "bg-gray-50 text-gray-500"
			: "bg-blue-200 hover:bg-blue-200"
	}
	hover:bg-gray-100
  `}
			>
				{/* Avatar with Stacked Icon */}
				<div className="relative flex-shrink-0">
					<UserAvatar
						avatar={notification?.issuerAvatar}
						size={"size-12"}
						className="w-14 h-14 rounded-full"
					/>
					<div className="absolute bottom-0 right-0 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center shadow-md">
						{icon}
					</div>
				</div>

				{/* Notification Content */}
				<div className="flex-1 space-y-1">
					<div className="text-sm">
						<span className="font-semibold">
							{notification?.issuerUsername}
						</span>{" "}
						<span>{message}</span>{" "}
						<span className="font-semibold">
							{notification?.postTitle}
						</span>
					</div>
					<div className="text-xs text-gray-500">
						{notification?.timestamp}
					</div>
				</div>
			</article>
		</Link>
	);
}
