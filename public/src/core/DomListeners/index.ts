import { IDomListeners, IDomOptions } from "@core/DomListeners/types"
import { Dom } from "@core/Dom"
import { addOnToString } from "@core/utils/"


export class DomListener implements IDomListeners {

    protected $root: Dom
    private listeners: IDomOptions["listeners"]

    constructor($root: Dom, options: IDomOptions) {
        this.$root = $root
        this.listeners = options.listeners
    }

    initListeners(): void {
        this.listeners.forEach(listener => {
            const listenerWithOn = addOnToString(listener)
            if (!(this as any)[listenerWithOn]) {
                throw new Error(`Метод с названием ${listenerWithOn} не найден`)
            }
            (this as any)[listenerWithOn] = (this as any)[listenerWithOn].bind(this)
            this.$root.on(listener, (this as any)[listenerWithOn])

        })
    }
    destroyListeners(): void {
        this.listeners.forEach(listener => {
            const listenerWithOn = addOnToString(listener)
            if (!(this as any)[listenerWithOn]) {
                throw new Error(`Метод с названием ${listenerWithOn} не найден`)
            }
            (this as any)[listenerWithOn] = (this as any)[listenerWithOn].bind(this)
            this.$root.destroyListener(listener, (this as any)[listenerWithOn])

        })
    }
    
}
