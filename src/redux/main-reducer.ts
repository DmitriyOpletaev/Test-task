import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {testTaskApi} from "../api/api";
import {Position, User} from "../types/api-types";
import {sortUsersByRegistrationDate} from "../helpers/helpers";


let initialState = {
    isUserAuthorise: false,
    isLoadingUsers: false,
    isLoadingAuthorization: false,
    isLoadingApp:true as null|boolean,
    users: [] as Array<User>,
    searchData: {
        totalPages: null as null | number,
        nextPage: 1
    },
    positions: [] as Array<Position>,
    authError: null as string | null
}
type SearchData = InitialState['searchData']


export const reducer = (state = initialState, action: MainActions): InitialState => {
    switch (action.type) {
        case "TEST_TASK/SET_IS_LOADING_USERS":
            return {
                ...state,
                isLoadingUsers: action.payload
            }
        case "TEST_TASK/SET_IS_LOADING_AUTHORIZATION":
            return {
                ...state, isLoadingAuthorization: action.payload
            }
        case "TEST_TASK/SET_IS_LOADING_APP":
            return {
                ...state, isLoadingApp: action.payload
            }
        case "TEST_TASK/SET_USERS":
            const {users, searchData} = action.payload
            return {
                ...state,
                users: action.payload.searchData.nextPage === 2
                    ? users
                    : state.users.concat(sortUsersByRegistrationDate(users)),
                searchData: action.payload.searchData
            }
        case "TEST_TASK/SET_POSITIONS":
            return {
                ...state,
                positions: action.payload
            }
        case "TEST_TASK/SET_AUTH_ERROR":
            return {
                ...state,
                authError: action.payload
            }
        case "TEST_TASK/SET_USER_IS_AUTHORISE":
            return {
                ...state,isUserAuthorise: true
            }
        default:
            return state
    }
}

export const actions = {
    setIsLoadingUsers: (users: boolean) => ({
        type: 'TEST_TASK/SET_IS_LOADING_USERS',
        payload: users
    } as const),
    setIsLoadingAuthorization: (IsLoadingAuthorization: boolean) => ({
        type: 'TEST_TASK/SET_IS_LOADING_AUTHORIZATION',
        payload: IsLoadingAuthorization
    } as const),
    setIsLoadingApp: (isLoadingApp:boolean|null) => ({
        type: 'TEST_TASK/SET_IS_LOADING_APP',
        payload:isLoadingApp
    } as const),
    setUsers: (users: Array<User>, searchData: SearchData) => ({
        type: 'TEST_TASK/SET_USERS',
        payload: {users, searchData}
    } as const),
    setPositions: (positions: Array<Position>) => ({
        type: 'TEST_TASK/SET_POSITIONS',
        payload: positions
    } as const),
    setAuthError: (authError: string|null) => ({
        type: 'TEST_TASK/SET_AUTH_ERROR',
        payload:authError
    } as const),
    setUserIsAuthorise: () => ({
        type: 'TEST_TASK/SET_USER_IS_AUTHORISE'
    } as const),
}

export const loadApp = (): ThunkType => async (dispatch) => {
    try {
        await dispatch(getUsers(1))
        await dispatch(getPositions())
        dispatch(actions.setIsLoadingApp(false))
    }
    catch (error){
        dispatch(actions.setIsLoadingApp(null))
    }
}
export const getUsers = (
    nextPageNumber: number,
    count: number = 6
): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingUsers(true))
        const data = await testTaskApi.users(nextPageNumber, count)
        const searchData: SearchData = {
            totalPages: data.total_pages,
            nextPage: data.page + 1
        }
        dispatch(actions.setUsers(data.users, searchData))
    } catch (error) {
        console.error('Cant upload users')
    } finally {
        dispatch(actions.setIsLoadingUsers(false))
    }
}


const getPositions = (): ThunkType => async (dispatch) => {
    try {
        const {positions} = await testTaskApi.positions()
        dispatch(actions.setPositions(positions))
    } catch (error: any) {
           console.error( 'Cant upload registration page')
    }
}

export const registrationUser = (
    name: string,
    email: string,
    phone: string,
    positionId: number,
    photo: File,
): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingAuthorization(true))
        const {token} = await testTaskApi.registerToken()
        await testTaskApi.registration(token,name,email,phone,positionId,photo)
        await dispatch(getUsers(1,6))
        dispatch(actions.setUserIsAuthorise())
    } catch (error:any) {
            dispatch(actions.setAuthError(error?.response?.data?.message||'Something went wrong'))
    } finally {
        dispatch(actions.setIsLoadingAuthorization(false))
    }
}

type InitialState = typeof initialState
export type MainActions = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<MainActions>










