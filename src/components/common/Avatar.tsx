import {FC} from "react"
import './CommonElements.sass'
export const Avatar: FC<AvatarProps> = ({imageSrc}) => {

    return (
        <div className={'avatar'}>
            <img
                alt={''}
                src={imageSrc}
            />
        </div>
    )

}

type AvatarProps = {
    imageSrc:string
}