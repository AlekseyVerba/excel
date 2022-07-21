import { Dom, $ } from "@/core/Dom";
import { IPage } from "./type"
import { Dashboard } from "../components/Dashboard"

export class DashboardPage implements IPage {

    private currentComponent: Dashboard

    constructor() {
      this.currentComponent = new Dashboard($.create("div").addClass(Dashboard.classComponent))
    }

    getRoot(): Dom {
        return this.currentComponent.getRoot
    }
    init(): void {
        this.currentComponent.init()
        this.afterRendering()
    }
    afterRendering(): void {
        console.log("afterrender")
    }
    destroy(): void {
        this.currentComponent.destroy()
    }
    
}