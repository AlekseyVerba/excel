import { IAction, IMainState, IReturnCombine } from "../types"

export function combineReducers(reducersMap: Record<string, (state: any, action: any) => any>): IReturnCombine {
    let state: any = {}
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        state[key] = reducer(state[key], {type: "start"})
      })
      state as IMainState
    return {
      state,
      reducer: function combinationReducer(newState: IMainState, action: IAction) {
        const nextState: Record<string, any> = {}

        Object.entries(reducersMap).forEach(([key, reducer]) => {
          nextState[key] = reducer(newState[key as keyof IMainState], action)
        })

        return nextState as IMainState
      }
    }
  }