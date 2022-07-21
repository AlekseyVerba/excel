import { DashboardTypeActions, IActionDashboard, IStateDashboard } from "./type"

const defaultState: IStateDashboard = {
    myTables: []
}

export const dashboardReducer = (state = defaultState, action: IActionDashboard): IStateDashboard => {

    switch(action.type) {

        case DashboardTypeActions.ADD_TABLES_MY_TABLES: {
            return {
                ...state,
                myTables: action.payload
            }
        }

        default: {
            return state
        }
    }

}