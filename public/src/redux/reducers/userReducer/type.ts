import { IUser } from "@/types/user"

export enum UserTypeActions {
    ADD_USER = "ADD_USER",
    CHECK_AUTH = "CHECK_AUTH"
}

interface IActionAddUser {
    type: UserTypeActions.ADD_USER
    payload: IUser
}

interface IActionCheckAuth {
    type: UserTypeActions.CHECK_AUTH
}

export type IActionUser = IActionAddUser | IActionCheckAuth

export interface IStateUser extends IUser {
    checkAuth: boolean
}