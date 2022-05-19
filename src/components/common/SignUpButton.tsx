import React, {FC} from "react"
import './CommonElements.sass'

export const SignUpButton: FC<SignUpButtonProps> = (
    {onClickCallback,type,disabled}
) => {
    return (
            <button
                disabled={disabled}
                type={type}
                className={'primary-button'}
                onClick={onClickCallback}
            >
                    Sign up
            </button>
    )
}
type SignUpButtonProps = {
    onClickCallback?:()=>void
    type?: "button" | "submit" | "reset"
    disabled?:boolean
}