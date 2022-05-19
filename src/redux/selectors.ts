import {AppState} from "./redux-store";


export const testAppSelector={
    users:(state:AppState)=>state.reducer.users,
    isLoadingUsers :(state:AppState)=>state.reducer.isLoadingUsers,
    searchData :(state:AppState)=>state.reducer.searchData,
    positions :(state:AppState)=>state.reducer.positions,
    isUserAuthorise :(state:AppState)=>state.reducer.isUserAuthorise,
    isLoadingAuthorization :(state:AppState)=>state.reducer.isLoadingAuthorization,
    authError :(state:AppState)=>state.reducer.authError,
    isLoadingApp :(state:AppState)=>state.reducer.isLoadingApp,
}