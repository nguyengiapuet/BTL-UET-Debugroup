import { FaHeart, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserAvatar } from "../layout/Header";

export default function Notification({ notification, setOpenNotification }) {
	const notificationTypeMap = {
		FOLLOW: {
			message: `${notification?.issuerUsername} followed you`,
			icon: <FaUser className="size-7 " />,
			href: `/info/${notification?.issuerUsername}`,
		},
		COMMENT: {
			message: `${notification?.issuerUsername} commented on your post`,
			icon: <MdMessage className="size-7 " />,
			href: `/project-detail/${notification?.postId}`,
		},
		LIKE: {
			message: `${notification?.issuerUsername} liked your post`,
			icon: <FaHeart className="size-7" />,
			href: `/project-detail/${notification?.postId}`,
		},
	};

	const { message, icon, href } = notificationTypeMap[notification?.type];

	return (
		<Link
			to={href}
			onClick={() => setOpenNotification(false)}
			className="block"
		>
			<article
				className={`flex gap-3 mt-2 items-center rounded-2xl p-5 shadow-sm transition-colors hover:bg-slate-200
					 ${
							notification?.isRead === 1
								? "bg-slate-100"
								: "bg-blue-200 hover:bg-blue-100"
						}
					`}
			>
				<div className="my-1">{icon}</div>

				<div className="border-l-2 pl-2 border-gray-400 space-y-3 flex items-center gap-4">
					<UserAvatar
						avatar={notification?.issuerAvatar}
						size={"size-10"}
					/>
					<div className="flex flex-col justify-center gap-1">
						<span className="font-bold">
							{notification?.issuerUsername}
						</span>{" "}
						<div className=" overflow-hidden break-words">
							<div className="line-clamp-2 whitespace-pre-line text-muted-foreground">
								{message} {notification?.postTitle}
							</div>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
}
