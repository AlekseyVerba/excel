export interface IUser {
    id: number
    email: string
}

export type IUserWithToken = {
    user: IUser
    token: string
}