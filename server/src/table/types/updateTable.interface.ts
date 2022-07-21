import { Table } from "../table.entity"

export type IUpdateTable = Partial<Omit<Table, "id" | "link" | "ownUser">>