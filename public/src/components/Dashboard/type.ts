import { ITable } from "@/types/table/"

export interface IStateDashboard {
    loading: boolean
    tables: ITable[]
}

export interface ICreateNewUrlForTable {
    id: string
    url: string
}