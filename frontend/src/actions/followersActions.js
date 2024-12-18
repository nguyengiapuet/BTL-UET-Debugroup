export const addFollower = (followerId) => ({
	type: "ADD_FOLLOWER",
	payload: followerId,
});

export const removeFollower = (followerId) => ({
	type: "REMOVE_FOLLOWER",
	payload: followerId,
});

export const setFollowers = (followers) => ({
	type: "SET_FOLLOWERS",
	payload: followers,
});

export const clearFollowers = () => ({
	type: "CLEAR_FOLLOWERS",
});
