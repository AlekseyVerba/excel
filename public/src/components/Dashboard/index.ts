import { Component } from "@core/Component"
import { Dom, $ } from "@core/Dom"
import { createTemplate } from "./dashboard.template"
import { requestGETOrDELETE } from "../../requests/"
import { EnumRequestGet } from "../../requests/requestEnum"
import { ITable } from "@/types/table"
import { addTableMyTables } from "@redux/creatorsActions/dashboardCreatorActions"
import { isButtonCreate } from "./dashboard.functions"
import { createTable } from "./dashboardCreateExcel"
import { StateComponent } from "@core/StateComponent"
import { IStateDashboard } from "./type"

export class Dashboard extends StateComponent<IStateDashboard> {

    static classComponent: string = "dashboard"

    constructor($root: Dom) {
        super($root, {
            listeners: ["click"]
        })
    }

    preparing(): void {
        this.initState({
            loading: true,
            tables: []
        })
    }

    override async init(): Promise<void> {
        super.init()
        const tables = await requestGETOrDELETE<ITable[]>(EnumRequestGet.GET_MY_TABLES)
        
        if (tables.length) {
            this.store.dispatch(addTableMyTables(tables))
            this.setState({tables: tables})
        }
        this.setState({loading: false})
    }

    get getRoot(): Dom {
        return this.$root
    }


    get getTemplate(): string {
        return this.toHTML()
    }

    onClick(event: MouseEvent): void {
        const $target = $(event.target as HTMLElement)

        if (isButtonCreate($target)) {
            event.preventDefault()
            createTable($target)
        }
    }

    override toHTML(): string {
        return createTemplate(this.state)
    }

}