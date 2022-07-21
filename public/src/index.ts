import "@/scss/index.scss"
import { Router } from "@core/Router"
import { DashboardPage } from "@/pages/DashboardPage"
import { ExcelPage } from "@/pages/ExcelPage"
import { Observer } from "@core/Observer"
import { Store } from "@/core/Store"
import { FormPage } from "@/pages/FormPage"
import { StartPage } from "./pages/CheckAuthPage"

export const store = new Store()
export const observer = new Observer()

const router = new Router("#app", {
    excel: ExcelPage,
    dashboard: DashboardPage,
    form: FormPage,
    checkAuth: StartPage
})

router.init()