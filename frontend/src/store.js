import { createStore, combineReducers } from "redux";
import followersReducer from "./reducers/followersReducer";

const rootReducer = combineReducers({
	followers: followersReducer,
});

const store = createStore(rootReducer);

export default store;
