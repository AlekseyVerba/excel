import { Dom } from "@/core/Dom";
import { IPage } from "./type"
import { Excel } from "@сomponents/Excel"
import { Formula } from "@сomponents/Formula"
import { Head } from "@сomponents/Head"
import { Table } from "@сomponents/Table"
import { Toolbar } from "@сomponents/Toolbar"

export const components = [Head, Toolbar, Formula, Table]

export class ExcelPage implements IPage {

    private excelComponent: Excel

    constructor() {

        this.excelComponent = new Excel(components, "excel")
    }

    getRoot(): Dom {
        return this.excelComponent.getRoot()
    }

    init(): void {
        this.excelComponent.init()
    }

    afterRendering(): void {
        
    }

    destroy(): void {
        this.excelComponent.destroy()
    }
    
}