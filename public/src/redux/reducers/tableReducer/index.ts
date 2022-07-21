import { IActionTable, IStateTable, TableTypeActions } from "./type"

const defaultState: IStateTable = {
    content: {},
    columnWidth: {},
    rowHeight: {},
    styleCell: {},
    id: NaN,
    name: ""
}

export const tableReducer = (state = defaultState, action: IActionTable): IStateTable => {
    switch(action.type) {

        case TableTypeActions.ADD_CONTENT: {
            return {
                ...state,
                content: {
                    ...state.content,
                    [action.payload.id]: action.payload.value
                }
            }
        }

        case TableTypeActions.ADD_STYLE_CELL: {
            let styles: any = {}

            if (state.styleCell[action.payload.id]) {
                styles[action.payload.id] = JSON.stringify({...JSON.parse(state.styleCell[action.payload.id]), ...JSON.parse(action.payload.value)})
            } else {
                styles[action.payload.id] = action.payload.value
            }
   
            return {
                ...state,
                styleCell: {
                    ...state.styleCell,
                    ...styles
                }
            }
        }

        case TableTypeActions.CHANGE_COLUMN_WITDH: {
            return {
                ...state,
                columnWidth: {
                    ...state.columnWidth,
                    [action.payload.id]: action.payload.value
                }
            }
        }

        case TableTypeActions.CHANGE_ROW_HEIGHT: {
            return {
                ...state,
                rowHeight: {
                    ...state.rowHeight,
                    [action.payload.id]: action.payload.value
                }
            }
        }

        case TableTypeActions.GET_INFO_TABLE: {
            const newContent = action.payload
            return {
                ...state,
                ...newContent
            }
        }

        case TableTypeActions.CHANGE_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }

        default: {
            return state
        }

    }

}