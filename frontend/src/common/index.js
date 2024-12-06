const backendDomain = "http://localhost:8080";

const SummaryApi = {
	signUp: {
		url: `${backendDomain}/api/signup`,
	},
	logIn: {
		url: `${backendDomain}/api/signin`,
	},
	getDetailsUser: {
		url: `${backendDomain}/api/user-details`,
	},
	getAllUsers: {
		url: `${backendDomain}/api/getall`,
	},
	deletedUser: {
		url: `${backendDomain}/api/delete-user`,
	},
	createPens: {
		url: `${backendDomain}/api/create-pens`,
	},
	getAllPens: {
		url: `${backendDomain}/api/getall-pens`,
	},
	getPens: {
		url: `${backendDomain}/api/get-pens`,
	},
	restorePen: {
		url: `${backendDomain}/api/restore-pen`,
	},
	deletePens: {
		url: `${backendDomain}/api/delete-pens`,
	},
	deletePenForever: {
		url: `${backendDomain}/api/delete-pen-forever`,
	},
	updatePens: {
		url: `${backendDomain}/api/update-pens`,
	},
	allPens: {
		url: `${backendDomain}/api/all-pens`,
	},
	deletedPens: {
		url: `${backendDomain}/api/deleted-pens`,
	},
	addLike: {
		url: `${backendDomain}/api/add-like`,
	},
	deleteLike: {
		url: `${backendDomain}/api/delete-like`,
	},
	getAllLikeByUser: {
		url: `${backendDomain}/api/all-like`,
	},
	totalLike: {
		url: `${backendDomain}/api/total-like`,
	},
	sendComments: {
		url: `${backendDomain}/api/send-comments`,
	},
	allComments: {
		url: `${backendDomain}/api/all-comments`,
	},
	totalComments: {
		url: `${backendDomain}/api/total-comments`,
	},
	updateProfile: {
		url: `${backendDomain}/api/update-profile`,
	},
	detailUserOther: {
		url: `${backendDomain}/api/info`,
	},
	createFollower: {
		url: `${backendDomain}/api/create-follower`,
	},
	deleteFollower: {
		url: `${backendDomain}/api/delete-follower`,
	},
	getFollower: {
		url: `${backendDomain}/api/follower`,
	},
	countFollower: {
		url: `${backendDomain}/api/follower-count`,
	},
	searchUser: {
		url: `${backendDomain}/api/search`,
	},
	searchProjectByName: {
		url: `${backendDomain}/api/search-project`,
	},
	deleteUserSoft: {
		url: `${backendDomain}/api/delete-user-soft`,
	},
	trashAllUsers: {
		url: `${backendDomain}/api/trash/allUser`,
	},
	restoreUser: {
		url: `${backendDomain}/api/restore-user`,
	},
	deleteCommentByUser: {
		url: `${backendDomain}/api/delete-comments`,
	},
	editCommentByUser: {
		url: `${backendDomain}/api/edit-comments`,
	},
	getAllCommentsByAdmin: {
		url: `${backendDomain}/api/admin/all-comments`,
	},
	deleteCommentByAdmin: {
		url: `${backendDomain}/api/admin/delete-comments`,
	},
	getFollowing: {
		url: `${backendDomain}/api/get-following`,
	},
	changePassword: {
		url: `${backendDomain}/api/change-password`,
	},
	checkPasswordUser: {
		url: `${backendDomain}/api/check-password`,
	},
	totalLikePen: {
		url: `${backendDomain}/api/total-like-pen`,
	},
	totalCommentPen: {
		url: `${backendDomain}/api/total-comment-pen`,
	},
	getAllNotificationByUser: {
		url: `${backendDomain}/api/all-notification`,
	},
	countNotificationUnread: {
		url: `${backendDomain}/api/count-notification-unread`,
	},
	markAsReadNotification: {
		url: `${backendDomain}/api/mark-as-read-notification`,
	},
	getListFollowingUser: {
		url: `${backendDomain}/api/list-following-user`,
	},
	//learn
	getQuestion1: {
		url: `${backendDomain}/api/learn/question1`,
	},
};

export default SummaryApi;
