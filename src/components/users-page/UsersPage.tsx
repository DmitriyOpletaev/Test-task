import { useEffect} from "react"
import './UsersPage.sass'
import {UserCard} from "./UserCard";
import {ShowMoreButton} from "../common/ShowMoreButton"
import { getUsers} from "../../redux/main-reducer"
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/redux-store";
import {testAppSelector} from "../../redux/selectors";



export const UsersPage = () => {
    const dispatch = useAppDispatch()
    const users=useSelector(testAppSelector.users)
    const {nextPage} = useSelector(testAppSelector.searchData)
    useEffect(()=>{
       nextPage === 1 && dispatch(getUsers(nextPage))
    },[])
    const Users = users.map(({phone,id,photo,name,email,position})=>
        <UserCard key={id} phone={phone} photo={photo} name={name} email={email} position={position}/>
    )
    return (
        <div className={'users-page-container'}>
            <h1 className={'users-page-title'}>
                Working with GET request
            </h1>
            <div className={'users-card-container'}>
                {Users}
            </div>
            <div className={'show-more-button-container'}>
                <ShowMoreButton/>
            </div>
        </div>
    )

}