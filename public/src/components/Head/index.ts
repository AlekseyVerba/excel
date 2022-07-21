import { Component } from "@core/Component"
import { Dom, $ } from "@core/Dom"
import { changeNameAC } from "@redux/creatorsActions/tableCreatorActions/"
import { SubscriberEnum } from "@/types/subscriberTypes"
import { createTemplate } from "./head.template"
import { requestGETOrDELETE } from "@/requests/index"
import { EnumRequestDelete } from "@/requests/requestEnum"
import { IErrorResponse, ISuccessResponse } from "@/types/responses"
import { ITable } from "@/types/table"

export class Head extends Component {
    
    static classComponent: string = "excel__header"

    constructor($root: Dom) {
        super($root, {
            listeners: ["input", "click"]
        })
    }

    override toHTML(): string {
        const nameTable = this.store.getState.table.name
        return createTemplate(nameTable)
    }

    updateRoot():void {
        this.$root.html(this.toHTML())
    }

    override init():void {
        super.init()

        this.observer.subscribe(SubscriberEnum.GET_NAME, (name: string) => {
            this.updateRoot()
        })

    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement
        const value = input.value
        this.store.dispatch(changeNameAC(value))
    }

    async onClick(event: MouseEvent): Promise<void> {
        const $target = $(event.target as HTMLElement)
        
        if ($target.closest("[data-delete]")) {
            
            const {status} = await requestGETOrDELETE<ISuccessResponse<ITable[]> | IErrorResponse>(`${EnumRequestDelete.DELETE_TABLE}/${this.store.getState.table.id}`, "DELETE")
            console.log(status)
            if (status) {
                location.hash = "dashboard"
            }

        }

    }

}
