import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import {reducer as UsersReducer} from "./UserReducer/reducer";
import {reducer as MessagesReducer} from "./MessagesReducer/reducer";

const rootReducer = combineReducers({
    UsersReducer,
    MessagesReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));