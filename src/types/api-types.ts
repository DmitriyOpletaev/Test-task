interface ApiResponse{
    success: boolean
}
export interface AccessToken extends ApiResponse{
    token:string
}
export interface GetUsersListing extends ApiResponse{
    page: number
    total_pages: number
    total_users: number
    count: number
    links:PageLinks
    users:Array<User>
}
export interface GetUser extends ApiResponse{
    user:User
}
export interface PageLinks{
    next_url:string|null
    prev_url:string|null
}
export interface User{
    id: number
    name: string
    email: string
    phone: string
    position: string
    position_id: number
    registration_timestamp: number
    photo:string
}

export interface GetPositionsResponse{
    positions : Array<Position>
}
export interface Position{
    id:number
    name:string
}


export type UserRegisterResponse={
    success:boolean,
    user_id:number,
    message:string
}




export interface GetTokenResponse extends ApiResponse{
    token:string
}