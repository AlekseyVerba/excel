import { DomListener } from "@core/DomListeners"
import { IDomOptions } from "@core/DomListeners/types"
import { Dom } from "@core/Dom"
import { IComponent } from "./types"
import { Observer } from "../Observer"
import { Store } from "@core/Store"
import { IMainState } from "@/redux/types"
import { observer, store } from "@/index"


export class Component  extends DomListener implements IComponent {

    observer: Observer
    store: Store
    listenerState: (keyof IMainState)[]

    constructor($root: Dom, options: IDomOptions = {
        listeners: []
    }) {
        super($root, options)
        this.observer = observer
        this.store = store
        this.listenerState = []
        this.preparing()
    }

    preparing(): void {

    }

    init(): void {
        this.initListeners()
    }
    
    stateChange(state: Record<string, any>): void {
        
    }

    destroy(): void {
        this.destroyListeners()
    }

    toHTML(): string {
        throw new Error("Необходимо реализовать метод")
    }


}
