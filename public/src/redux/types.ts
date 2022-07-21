import { IStateToolbar, IActionToolbar } from "./reducers/toolbarReducer/types"
import { IStateTable, IActionTable } from "./reducers/tableReducer/type"
import { IActionUser, IStateUser } from "./reducers/userReducer/type"
import { IActionDashboard, IStateDashboard } from "./reducers/dashboardReducer/type"

export interface IMainState {
    toolbar: IStateToolbar
    table: IStateTable
    user: IStateUser
    dashboard: IStateDashboard
}

export type IAction = IActionToolbar | IActionTable | IActionUser | IActionDashboard


export interface IReturnCombine {
    state: IMainState,
    reducer: (state: IMainState, action: IAction) => IMainState
}