import { IActionUser, IStateUser, UserTypeActions } from "./type"

const defaultState: IStateUser = {
    id: NaN,
    email: "",
    checkAuth: false
}

export const userReducer = (state = defaultState, action: IActionUser): IStateUser => {

    switch(action.type) {

        case UserTypeActions.ADD_USER: {
            return {
                ...state,
                ...action.payload
            }
        }

        case UserTypeActions.CHECK_AUTH: {
            return {
                ...state,
                checkAuth: true
            }
        }

        default: return state

    }

}