export interface IRequestPostOrPut<TYPE_BODY> {
    url: string
    body: TYPE_BODY
    method?: "POST" | "PUT"
    auth?: boolean
}