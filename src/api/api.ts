import axios from "axios";
import {
    GetPositionsResponse,
    GetTokenResponse,
    GetUser,
    GetUsersListing,
    UserRegisterResponse
} from "../types/api-types";

const instanceAxios = (registerToken: string | null = null) => axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/'
})

export const testTaskApi = {
    users: (
        page: number,
        count: number
    ) => {
        const params = {
            page, //integer - minimum: 1
            count  //integer - default: 5 - minimum: 1 - maximum: 100
        }
        return instanceAxios().get<GetUsersListing>(
            'users', {params}
        ).then(res => res.data)
    },
    getUserById:(id:string)=>{
            return instanceAxios().get<GetUser>('users',{params:{id}}).then(res=>res.data)
    },
    positions: () => {
        return instanceAxios().get<GetPositionsResponse>('positions').then(res => res.data)
    },
    registration: (
        registerToken: string,
        name: string,
        email: string,
        phone: string,
        position_id: number,
        photo: File
    ) => {
        return instanceAxios(registerToken).post<UserRegisterResponse>(
            'users',
            {name, email, phone, position_id, photo},
            {
                headers: {
                    'Token': registerToken,
                    'Content-Type': 'multipart/form-data'
                }
            },
        ).then(res => res.data)
    },
    registerToken: () => {
        return instanceAxios().get<GetTokenResponse>('token').then(res => res.data)
    }
}