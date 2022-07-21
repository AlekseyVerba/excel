import { Properties } from "csstype"
import { IActionToolbar, IStateToolbar, ToolbarTypeActions } from "./types"

export let defaultValueForButtons: Properties = {
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none"
}

export const defaultState: IStateToolbar = {
    value: defaultValueForButtons
}

export const toolbarReducer = (state = defaultState, action: IActionToolbar): IStateToolbar => {
    switch(action.type) {

        case ToolbarTypeActions.CHANGE_STYLE: {

            const newStyles: any = {...state.value}

            for (let i in action.payload) {
                newStyles[i as any] = action.payload[i as keyof Properties]
            }

            return {
                ...state,
                value: newStyles
            }

        }

        default: {
            return state
        }
    }

}