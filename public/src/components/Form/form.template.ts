import { IInput } from "./type"
import { RouterPath } from "@core/RouterPath"

export const createTemplate = (typeForm: "register" | "login"): string => {

    const { buttonSubmitText, link, title } = getInfoDependOnTypeForm(typeForm)

    return `
        <form class="form__form">
            <h1>${title}</h1>
            ${createInputForm({className: "form__input", labelText: "Email", placeholder: "Email", name: "email"})}
            ${createInputForm({className: "form__input", labelText: "Password", placeholder: "Password", name: "password"})}
            <button class="form__button" type="submit">${buttonSubmitText}</button>
            <div class="form__inform" data-form-inform></div>
        </form>
        <a href="${link}">Войти</a>
    `
}

const getInfoDependOnTypeForm = (typeForm: "register" | "login") => {
    
    const title = typeForm === "register" ? "Регистрация" : "Авторизация"
    const buttonSubmitText = typeForm === "register" ? "Регистрация" : "Авторизация"
    const link = RouterPath.originURL + `${typeForm === "register" ? "login" : "register"}`

    return {
        title,
        buttonSubmitText,
        link
    }
}

const createInputForm = ({labelText, placeholder, type, className, name}: IInput): string => {
    return `
        <label>
            <div>${labelText ? labelText : ""}</div>
            <input  type=${type ? type : "string"} 
                    placeholder=${placeholder ? placeholder : ""}
                    class="${className}"
                    name="${name}" />
        </label>
    `
}

