import { Dom, $ } from "@/core/Dom"
import { Component } from "@core/Component"
import { createTable } from "./html/"
import { isEqal, isResize } from "@core/utils/"
import { startResize } from "./resize"
import { Section } from "./Section"
import { isCell } from "@core/utils"
import { changeSection, changeSectionWithKey } from "./sectionMethods"
import { Observer } from "@core/Observer"
import { SubscriberEnum } from "@/types/subscriberTypes"
import { Properties } from "csstype"
import { Store } from "@/core/Store"
import { changeStyleAC } from "@redux/creatorsActions/toolbarCreatorAction"
import { changeInfoAC, getAllInfoAC } from "@redux/creatorsActions/tableCreatorActions"
import { TableTypeActions } from "@/redux/reducers/tableReducer/type"
import { templateLoader } from "../../templates/loader"
import { EnumRequestGet } from "@/requests/requestEnum"
import { requestGETOrDELETE } from "@/requests/index"
import { IErrorResponse, ISuccessResponse } from "@/types/responses"
import { ITable } from "@/types/table"
import { IMainState } from "@/redux/types"
import { IOnlyObj } from "@/redux/reducers/tableReducer/type"
import { EnumRequestPut } from "@/requests/requestEnum"
import { requestPostOrPut } from "@/requests/index"


export class Table extends Component {

    section!: Section
    prevStateTable: IMainState["table"]
    private loading: boolean = true
    constructor($root: Dom) {
        super($root, {
            listeners: ["mousedown", "keydown", "input"]
        })
        this.listenerState = ["table"]
        this.prevStateTable = this.store.getState.table
    }
    
    static classComponent: string = "excel__table"

    override toHTML(): string {
        let html = ``
        if (this.loading) {
            html += templateLoader()
        }
        html += createTable(20, this.loading, this.store.getState.table)
        return html
    }

    override async stateChange(state: IMainState["table"]): Promise<void> {
        console.log(state)
        const keys: (keyof IOnlyObj)[] = ["columnWidth", "content", "rowHeight", "styleCell", "name"]
        const updateObject: any = {}
        keys.forEach(key => {
            if (!isEqal(state[key], this.prevStateTable[key])) {
                const value = state[key]
                updateObject[key] = value
            }
        }) 

        if (Object.keys(updateObject).length > 0) {
            const res = await requestPostOrPut({url: `${EnumRequestPut.UPDATE_TABLE}/${state.id}`, body: updateObject, auth: true, method: "PUT"})
            console.log(res)
        }

        this.prevStateTable = state

    }

    override async init(): Promise<void> {
        super.init()
        const linkTable = location.hash.split("excel/")[1]!
        const res = await requestGETOrDELETE<ISuccessResponse<any> | IErrorResponse>(`${EnumRequestGet.GET_TABLE}/${linkTable}`)
        
        if (!res.status) throw new Error(`Ошибка: ${res.message}`)

        const { data } = res
        const dataToJson: any = {}

        for(let i in data) {
            try {
                let dataJSON = JSON.parse(data[i])
                console.log(dataJSON)
                dataToJson[i] = dataJSON
            } catch(e) {
                dataToJson[i] = data[i]
            }
        }

        

        this.loading = false
        this.store.dispatch(getAllInfoAC(dataToJson))
        this.$root.html(this.toHTML())
        this.observer.notify(SubscriberEnum.GET_NAME, data.name)


        this.section = new Section(`[data-id="65:1"]`, this.observer, this.store)


        this.observer.subscribe(SubscriberEnum.TABLE_GET_TEXT_FROM_FORMULA,({text, expression}: {text: string, expression: string}) => {
            this.section.currentSectionsArr.forEach(section => {
                section.text(text)
                section.attr("data-expression", expression)
                this.addContent(expression)
            })
        })

        this.observer.subscribe(SubscriberEnum.CLICK_TOOLBAR, (styles: Properties) => {
            
            for (let i in styles) {
                this.section.currentSectionsArr.forEach(section => {
                    section.addStyle({[i]: styles[i as keyof Properties]})
                })
            }
            this.store.dispatch(changeStyleAC(styles))
            this.store.dispatch(changeInfoAC(TableTypeActions.ADD_STYLE_CELL, {id: this.section.currentSection.dataset.id!, value: JSON.stringify(styles)}))

        })
    }

    addContent(text: string): void {
        
        this.section.currentSectionsArr.forEach(section => {
            const sectionID = section.dataset.id!
            this.store.dispatch(changeInfoAC(TableTypeActions.ADD_CONTENT,{id: sectionID, value: text}))
        })
    }

    onMousedown(event: MouseEvent): void {
        const $target = $(event.target as HTMLElement)
        const dataAttrs = $target.dataset
        if (isResize(dataAttrs)) {
            startResize($target, dataAttrs.columnLine as "column" | "row", this.store)
        } else if (isCell($target)) {
            changeSection(this.section, $target, event)
        }

    }

    onKeydown(event: KeyboardEvent): void {
        const $target = $(event.target as HTMLElement)

        if(isCell($target)) {
            changeSectionWithKey(this.section, event)
        }

    }

    onInput(event: Event):void {

        this.observer.notify(SubscriberEnum.GET_TEXT_CURRENT_SECTION, {text: this.section.currentSection.text()})
        this.addContent(this.section.currentSection.text()!)
    }

}
