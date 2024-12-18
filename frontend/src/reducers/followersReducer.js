const initialState = {
	followers: [],
};

const followersReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_FOLLOWER":
			return {
				...state,
				followers: [...state.followers, action.payload],
			};
		case "REMOVE_FOLLOWER":
			return {
				...state,
				followers: state.followers.filter(
					(followerId) => followerId !== action.payload
				),
			};
		case "SET_FOLLOWERS":
			return {
				...state,
				followers: action.payload,
			};
		default:
			return state;
	}
};

export default followersReducer;
