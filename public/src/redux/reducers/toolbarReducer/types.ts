import { Properties } from "csstype"

export enum ToolbarTypeActions {
    CHANGE_STYLE = "CHANGE_STYLE"
}

export interface IActionChangeStyle {
    type: ToolbarTypeActions.CHANGE_STYLE
    payload: {
        [key in keyof Properties]?: Properties[key]
    }
}

export type IActionToolbar = IActionChangeStyle


type KeysProperties = {
    value: {
        [key in keyof Properties]?: Properties[key]
    }

}

export interface IStateToolbar extends KeysProperties {

}

