import { IUser, IUserWithToken } from "../../types/user"

export const isUserWithToken = (user: IUser | IUserWithToken): user is IUserWithToken => {
    return "token" in user
}