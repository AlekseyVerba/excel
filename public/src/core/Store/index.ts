
import { IMainState } from "@redux/types"
import { IAction } from "@redux/types"
import { reducer, state } from "@redux/index"

export class Store {
    private state: IMainState
    private listeners: ((...args: any[]) => any)[] = []

    constructor() {
        this.state = state
    }

    subcribeState(fn: (...args: any[]) => any) {
        this.listeners.push(fn)
    }

    dispatch(action: IAction) {
        this.state = reducer(this.state, action)

        this.listeners.forEach(listener => listener(this.state))
    }

    get getState(): IMainState {
        return JSON.parse(JSON.stringify(this.state))
    }
}

