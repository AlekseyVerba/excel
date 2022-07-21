import { IActionTable, TableTypeActions, IStateTable } from "@redux/reducers/tableReducer/type"

type TypeChangeInfo = TableTypeActions.ADD_CONTENT | TableTypeActions.ADD_STYLE_CELL |
                     TableTypeActions.CHANGE_COLUMN_WITDH | TableTypeActions.CHANGE_ROW_HEIGHT

export const changeInfoAC = (type: TypeChangeInfo ,payload: {id: string, value: string}): IActionTable => {
    return {
        type,
        payload
    }
}

export const getAllInfoAC = (payload: Partial<IStateTable>): IActionTable => {
    return {
        type: TableTypeActions.GET_INFO_TABLE,
        payload
    }
}

export const changeNameAC = (payload: string): IActionTable => {
    return {
        type: TableTypeActions.CHANGE_NAME,
        payload
    }
}