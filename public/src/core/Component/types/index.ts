import { Observer } from "@core/Observer" 
import { IMainState } from "@redux/types"

export interface IComponent {
    observer: Observer
    init(): void
    destroy(): void
    toHTML(): string
    listenerState: (keyof IMainState)[]
    stateChange(state: Record<string, any>): void
}