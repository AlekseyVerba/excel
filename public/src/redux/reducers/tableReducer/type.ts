export enum TableTypeActions {
    ADD_CONTENT = "ADD_CONTENT",
    CHANGE_COLUMN_WITDH = "CHANGE_COLUMN_WITDH",
    CHANGE_ROW_HEIGHT = "CHANGE_ROW_HEIGHT",
    ADD_STYLE_CELL = "ADD_STYLE_CELL",
    GET_INFO_TABLE = "GET_INFO_TABLE",
    CHANGE_NAME = "CHANGE_NAME"
}

interface IActionAddContent {
    type: TableTypeActions.ADD_CONTENT
    payload: {
        id: string
        value: string
    }
}

interface IActionChangeColumnnWidth {
    type: TableTypeActions.CHANGE_COLUMN_WITDH
    payload: {
        id: string
        value: string
    }
}

interface IActionChangeRowHeight {
    type: TableTypeActions.CHANGE_ROW_HEIGHT
    payload: {
        id: string
        value: string
    }
}

interface IActionAddStyleCell {
    type: TableTypeActions.ADD_STYLE_CELL
    payload: {
        id: string
        value: string
    }
}

interface IActionGetInfoTable {
    type: TableTypeActions.GET_INFO_TABLE
    payload: Partial<IStateTable>
}

interface IActionChangeName {
    type: TableTypeActions.CHANGE_NAME,
    payload: string
}

export type IActionTable = IActionAddContent | IActionChangeColumnnWidth | IActionChangeRowHeight | IActionAddStyleCell | IActionGetInfoTable | IActionChangeName

export interface IStateTable {
    content: Record<string, string>
    columnWidth: Record<string, string>
    rowHeight: Record<string, string>
    styleCell: Record<string, string>
    id: number
    name: string
}

export type IOnlyObj = Omit<IStateTable, "id">