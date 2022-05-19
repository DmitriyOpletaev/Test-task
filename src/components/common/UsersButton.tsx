import {FC} from "react"

export const UsersButton: FC<UsersButtonProps> = ({onClickCallback}) => {

    return (
        <button className={'primary-button'} onClick={onClickCallback}>
            Users
        </button>
    )

}

type UsersButtonProps = {
    onClickCallback?:()=>void
}