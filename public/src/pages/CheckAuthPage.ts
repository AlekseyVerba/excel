import { $, Dom } from "@/core/Dom";
import { IPage } from "./type"
import { templateLoader } from "@/templates/loader"
import { StorageCurrentUser } from "@/constants/"
import { checkAuthAC, addUserAC } from "@redux/creatorsActions/userCreatorActions/"
import { store } from "@/index"
import { EnumRequestGet } from "@/requests/requestEnum"
import { requestGETOrDELETE } from "@/requests/index"
import { ISuccessResponse, IErrorResponse } from "@/types/responses"
import { IUserWithToken } from "@/types/user/"

export class StartPage implements IPage {


    getRoot(): Dom {
        const loader = $.create("div").html(templateLoader())
        return loader
    }
    async init(): Promise<void> {

        const currentToken = localStorage.getItem(StorageCurrentUser)

        if (!currentToken) {
            window.location.href = window.location.origin + "#form?login"
            store.dispatch(checkAuthAC())
            return
        }

        const res = await requestGETOrDELETE<ISuccessResponse<IUserWithToken> | IErrorResponse>(EnumRequestGet.AUTH)
        
        if (res.status) {
            localStorage.setItem(StorageCurrentUser, res.data.token)
            store.dispatch(addUserAC(res.data.user))
            store.dispatch(checkAuthAC())
            window.location.href = window.location.origin + "#dashboard"
            return
        }

        window.location.href = window.location.origin + "#form?login"
        store.dispatch(checkAuthAC())


        this.afterRendering()
    }
    afterRendering(): void {
        
    }
    destroy(): void {
        
    }

}