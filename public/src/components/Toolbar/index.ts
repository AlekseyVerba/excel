import { Component } from "@core/Component"
import { $, Dom } from "@core/Dom"
import { Observer } from "@core/Observer"
import { createHTML } from "./html"
import { Properties } from "csstype"
import { SubscriberEnum } from "@/types/subscriberTypes"
import { Store } from "@/core/Store"
import { IMainState } from "@redux/types"


export class Toolbar extends Component {

    constructor($root: Dom) {
        super($root, {
            listeners: ["click"]
        })

        this.listenerState = ["toolbar"]
    }
    
    static classComponent: string = "excel__toolbar"

    override toHTML(): string {
        return this.getTemplate
    }

    override init(): void {
        super.init()

    }

    override stateChange(state: IMainState["toolbar"]): void {
        this.$root.html(this.getTemplate)
    }

    get getTemplate(): string {
        return createHTML(this.store.getState)
    }


    onClick(event: MouseEvent): void {
        const $target = $(event.target as HTMLElement).closest(".button")

        if ($target) {
            const styles: Properties = JSON.parse($target.dataset.style!)
            
            this.observer.notify(SubscriberEnum.CLICK_TOOLBAR, styles)

        }
    }
 
}
