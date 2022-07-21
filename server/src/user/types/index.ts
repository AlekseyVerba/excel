import { User } from "../user.entity"

export type IUserWithoutPass = Omit<User, "password" | "hashPassword">
export type IUserWithToken = {
    user: IUserWithoutPass
    token: string
}

export interface IUserForToken {
    id: number
    email: string
}