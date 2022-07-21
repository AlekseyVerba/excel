import { Component } from "@core/Component"
import { Dom } from "@/core/Dom"
import { createTemplate } from "./form.template"
import { formSubmit } from "./form.submit"

export class Form extends Component {
    
    static classComponent: string = "form"
    typeForm: "register" | "login"

    constructor($root: Dom, typeForm: "register" | "login") {
        super($root, {
            listeners: ["click", "input", "submit"]
        })
        this.typeForm = typeForm
    }

    getRoot(): Dom {
        this.$root.html(this.toHTML())
        return this.$root
    }

    override toHTML(): string {
        return createTemplate(this.typeForm)
    }

    override init(): void {
        super.init()

    }

    onClick(event: MouseEvent):void {

    }

    onInput(event: Event):void {
        console.log("hello")
    }

    async onSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault()
        formSubmit<typeof this.typeForm>(event, this.typeForm)
    }

}