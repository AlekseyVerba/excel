import { Properties } from "csstype"




type KeysProperties = {
    value: {
        [key in keyof Properties]?: Properties[key]
    }

}

export interface IButton extends KeysProperties {
    name: string
    active: boolean
}
