import {FC} from "react"
import './CommonElements.sass'
import {lineBreak, substring} from "../../helpers/helpers";
export const Tooltip:FC<TooltipProps>=({value})=>{


    if(value.length<40)return <div>{value}</div>
    return(
        <div className={'tooltip-container'}>
            <div className={'string'}>
                {substring(value)}
            </div>
            <div className={'tooltip'}>
                {lineBreak(value)}
            </div>
        </div>
    )
}

type TooltipProps={
    value:string
}
