import {Action, applyMiddleware, combineReducers, legacy_createStore,compose} from "redux"
import thunkMiddleware,{ThunkAction} from "redux-thunk"
import {reducer} from "./main-reducer"
import {TypedUseSelectorHook, InferThunkActionCreatorType, useDispatch, useSelector} from "react-redux"

const rootReducer = combineReducers({
    reducer:reducer
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store;
type RootReducer = typeof rootReducer
export type AppState = ReturnType<RootReducer>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>
export const useAppDispatch = ()=>useDispatch<any>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector