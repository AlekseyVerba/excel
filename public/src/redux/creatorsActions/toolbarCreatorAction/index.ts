import { IActionToolbar, ToolbarTypeActions, IActionChangeStyle } from "@redux/reducers/toolbarReducer/types"

export const changeStyleAC = (payload: IActionChangeStyle["payload"]): IActionToolbar => {
    return {
        type: ToolbarTypeActions.CHANGE_STYLE,
        payload
    }
}
