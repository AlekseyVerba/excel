import { $, Dom } from "@/core/Dom";
import { IPage } from "./type"
import { Form } from "@/components/Form"

export class FormPage implements IPage {

    private params?: string
    private formComponent: Form

    constructor(params?: string) {
        if (params) {
            this.params = params
        }

        if (this.params?.includes("login")) {
            this.formComponent = new Form($.create("div").addClass(Form.classComponent), "login")
        } else {
            this.formComponent = new Form($.create("div").addClass(Form.classComponent), "register")
        }


    }

    getRoot(): Dom {
        return this.formComponent.getRoot()
    }
    init(): void {
        this.formComponent.init()
        this.afterRendering()
    }
    afterRendering(): void {
        
    }
    destroy(): void {
        this.formComponent.destroy()
    }

}