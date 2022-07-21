export interface IInput {
    labelText?: string
    labelClass?: string
    placeholder?: string
    type?: string
    className?: string 
    name: string
}

export interface IRequestForm {
    email: string
    password: string
}


export interface IGetInfoDependOnTypeForm {
    title: "Регистрация" | "Авторизация"
    buttonSubmitText: "Регистрация" | "Авторизация"
    url: string
}
