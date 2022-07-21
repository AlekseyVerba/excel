import { ITable } from "@/types/table"

export enum DashboardTypeActions {
    ADD_TABLES_MY_TABLES = "ADD_TABLES_MY_TABLES"
}

interface IActionAddTablesMyTables {
    type: DashboardTypeActions.ADD_TABLES_MY_TABLES
    payload: ITable[]
}

export type IActionDashboard = IActionAddTablesMyTables

export interface IStateDashboard {
    myTables: ITable[]
}