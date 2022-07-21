import { toolbarReducer } from "./reducers/toolbarReducer"
import { tableReducer } from "./reducers/tableReducer"
import { combineReducers } from "./combineReducer/"
import { userReducer } from "./reducers/userReducer/"
import { dashboardReducer } from "./reducers/dashboardReducer"

export const {state, reducer} = combineReducers({
    toolbar: toolbarReducer,
    table: tableReducer,
    user: userReducer,
    dashboard: dashboardReducer
})