import { Component } from "@core/Component/index"
import { Dom } from "../Dom";
import { IDomOptions } from "@core/DomListeners/types"



export class StateComponent<T> extends Component  {
    
    state!: T

    constructor($root: Dom, options:IDomOptions) {
        super($root, options)
    }

    initState(state: T): void {
        this.state = state
    }

    get getTemplate(): string {
        throw new Error("Необходимо переписать метод")
    }

    setState(newProper: Partial<T>): void {
        this.state = {...this.state, ...newProper}
        this.$root.html(this.getTemplate)
    }

}