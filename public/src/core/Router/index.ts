import { Dom, $ } from "@core/Dom"
import { IPages } from "./type"
import { RouterPath } from "@core/RouterPath"
import { IPage } from "@/pages/type"
import { store } from "@/index"

export class Router {
    $placeholder: Dom
    pages: IPages
    currentPage: IPage | null = null

    constructor(placeholderSelector: string, pages: IPages) {
        this.$placeholder = $(placeholderSelector)
        this.pages = pages
        this.hashChanged = this.hashChanged.bind(this)
    }

    init(): void {
        addEventListener("hashchange", this.hashChanged)
        this.hashChanged()
    }

    hashChanged(): void {
        const currentPath = RouterPath.getCurrentPage
        const get = RouterPath.getGET
        const state = store.getState
        console.log("aaa")
        if (this.currentPage) {
            this.currentPage.destroy()
            this.$placeholder.clear()
        }

        if (!state.user.checkAuth && !currentPath.includes("checkAuth")) {
            window.location.href = window.location.origin + "#checkAuth"
            return
        }

        if (!state.user.id && state.user.checkAuth && !currentPath.includes("form") ) {
            window.location.href = window.location.origin + "#form?login"
            return
        }

        Object.keys(this.pages).forEach(key => {


            if (currentPath.includes(key)) {
                this.currentPage = new this.pages[key](get) as IPage
    
                this.$placeholder.append(this.currentPage.getRoot())
                this.currentPage.init()
            }

        })



    }

}