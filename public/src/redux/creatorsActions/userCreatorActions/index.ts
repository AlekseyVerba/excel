import { IActionUser, UserTypeActions } from "../../reducers/userReducer/type"
import { IUser } from "@/types/user/"

export const addUserAC = (payload: IUser): IActionUser => {
    return {
        type: UserTypeActions.ADD_USER,
        payload
    }
}

export const checkAuthAC = (): IActionUser => {
    return {
        type: UserTypeActions.CHECK_AUTH
    }
}