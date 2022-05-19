import {FC} from "react"
import {ErrorMessage, Field} from "formik"

export const TextField: FC<TextFieldProps> = (
    {fieldName,exampleText,fieldValue,isError}) => {
    return (
        <div className={'input-container'}>
            <label>
                <Field
                    className={`registration-input ${isError&&'error'}`}
                    name={fieldName}
                />
                <div className={`input-name ${fieldValue && 'disabled'}`}>
                    {toUpperCaseFirsLetter(fieldName)}
                </div>
                {isError
                    ? <ErrorMessage name={fieldName} className={'error-message'} component={'div'}/>
                    :<div className={'example-text'}>{exampleText}</div>
                }
                </label>
        </div>
    )
}
function toUpperCaseFirsLetter(value:string){
    return value[0].toUpperCase()+value.slice(1)
}

type TextFieldProps = {
    fieldName:string
    fieldValue:string
    isError?:boolean
    exampleText?:string
}