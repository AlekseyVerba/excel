import { DashboardTypeActions, IActionDashboard } from "../../reducers/dashboardReducer/type"
import { ITable } from "@/types/table"

export const addTableMyTables = (payload: ITable[]): IActionDashboard => {
    return {
        type: DashboardTypeActions.ADD_TABLES_MY_TABLES,
        payload
    }
}