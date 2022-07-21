import { URL_HTTP } from "../constants/"
import { IRequestPostOrPut } from "./type"

export async function requestGETOrDELETE<TYPE_RETURN>(url: string, method: "GET" | "DELETE" = "GET"): Promise<TYPE_RETURN> {

    let authToken: string | null = localStorage.getItem("currentUser")

    let headers = {}

    if (authToken) {
        headers = Object.assign({}, headers, {'Authorization': 'Bearer ' + authToken})
    } 


    const res = await fetch(`${URL_HTTP}/${url}`,{
        method,
        headers
    }
    )

    const data = await res.json()

    console.log(data)

    if (!data) {
        throw new Error(`Ошибка запроса по "${URL_HTTP}/${url}"`)
    }
    
    data as TYPE_RETURN
    return data
}

export async function requestPostOrPut<TYPE_RETURN, TYPE_BODY extends Record<string, any>>
    ({ url, body, auth = false, method = "POST" }: IRequestPostOrPut<TYPE_BODY>): Promise<TYPE_RETURN> {

    let authToken: string | null = localStorage.getItem("currentUser")

    let headers = {
        'Content-Type': 'application/json'
    }

    if (auth && !authToken) {
        throw new Error("Вы не авторизованы")
    } else if (auth) {
        headers = Object.assign({}, headers, {'Authorization': 'Bearer ' + authToken})
    }

    const bodyJson = JSON.stringify(body)

    const res = await fetch(`${URL_HTTP}/${url}`, {
        method,
        body: bodyJson,
        headers
    })

    const data = await res.json()

    console.log(data)

    if (!data) {
        throw new Error(`Ошибка запроса по "${URL_HTTP}/${url}"`)
    }
    
    data as TYPE_RETURN
    return data
}