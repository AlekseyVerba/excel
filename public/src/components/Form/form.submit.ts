import { IRequestForm } from "./type"
import { requestPostOrPut } from "@/requests"
import { IUser, IUserWithToken } from "@/types/user"
import { ISuccessResponse, IErrorResponse } from "@/types/responses"
import { $, Dom } from "@core/Dom"
import { isUserWithToken } from "./typeguard"
import { store } from "@/index"
import { addUserAC } from "@redux/creatorsActions/userCreatorActions"
import { EnumRequestPost } from "@/requests/requestEnum"
import { StorageCurrentUser } from "@/constants/"
import { RouterPath } from "@core/RouterPath"

export async function formSubmit<T extends "register" | "login">(event: SubmitEvent, typeForm: T): Promise<void> {

    const form = event.target as HTMLElement
    const body = getBodyFromInput<IRequestForm>(form)
    const $form = $(form)

    let url: string = ""

    typeForm === "register" ? url = EnumRequestPost.REGISTER : url = EnumRequestPost.LOGIN

    let res = await requestPostOrPut<ISuccessResponse<T extends "register" ? IUser : IUserWithToken> | IErrorResponse, IRequestForm>({url, body})

    showResultToClient($form, res)

}


function getBodyFromInput<TYPE_RETURN>(form: HTMLElement): TYPE_RETURN {
    const body: any = {}

    form.querySelectorAll("input").forEach(input => {
        const $input = $(input)
        const nameInput = $input.attr("name")
        if (nameInput) body[nameInput] = input.value
    })

    return body as TYPE_RETURN
}


const showResultToClient = ($form: Dom, res: ISuccessResponse<IUser | IUserWithToken> | IErrorResponse): void => {
    const $inform = $form.find("[data-form-inform]")

    if (res.status) {
        $inform?.addClass("form__inform--success").html(res.message)

        if (isUserWithToken(res.data)) {
            localStorage.setItem(StorageCurrentUser, res.data.token)
            store.dispatch(addUserAC({id: res.data.user.id, email: res.data.user.email}))
            RouterPath.changeHash("dashboard")
        } 

    } else {
        $inform?.addClass("form__inform--error").html(res.message)
    }

    setTimeout(() => {
        $inform?.attr("class", "form__inform")
        $inform?.clear()
    }, 3000)
}

