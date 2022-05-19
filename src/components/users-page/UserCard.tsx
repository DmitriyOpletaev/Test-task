import {FC, ReactNode} from "react"
import {Tooltip} from "../common/Tooltip";
import {Avatar} from "../common/Avatar";



export const UserCard: FC<UserCardProps> = (props) => {
    const {name, email, photo, position, phone} = props

    return (
        <div className={'user-card-box'}>
            <Avatar imageSrc={photo}/>
            <Tooltip value={name}/>
            <Tooltip value={position}/>
            <Tooltip value={email}/>
            <Tooltip value={phone}/>
        </div>
    )

}


type UserCardProps = {
    photo: string
    name: string
    position: string
    email: string
    phone: string

}