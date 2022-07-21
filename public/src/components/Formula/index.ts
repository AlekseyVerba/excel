import { Component } from "@core/Component"
import { $, Dom } from "@core/Dom"
import { Observer } from "@core/Observer"
import { SubscriberEnum } from "@/types/subscriberTypes"
import { isExpression } from "@core/utils/"
import { Store } from "@/core/Store"

export class Formula extends Component {

    constructor($root: Dom) {
        super($root, {
            listeners: ["input"]
        })
    }

    static classComponent: string = "excel__formula"
    
    override toHTML(): string {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    override init(): void {
        super.init()

        this.observer.subscribe(SubscriberEnum.GET_TEXT_CURRENT_SECTION, ({text}: {text: string}) => {
            this.$root.find(".input")?.text(text)
        })

    }

    onInput(event: Event): void {
        const $target = $(event.target as HTMLElement)
        const text = $target.text()

        let result: string | null = ""

        if (text && isExpression(text)) {

            try {
                result = eval(text.slice(1).toString().trim())
            } catch(e) {}
            
        } else {
            result = text
        }

        this.observer.notify(SubscriberEnum.TABLE_GET_TEXT_FROM_FORMULA,{
            text: result,
            expression: text
        })
    }


}