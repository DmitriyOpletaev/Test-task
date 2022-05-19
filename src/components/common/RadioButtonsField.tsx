import {FC} from "react"
import {ErrorMessage} from "formik";
import {Position} from "../../types/api-types";
import './CommonElements.sass'

export const RadioButtonsField: FC<RadioButtonsFieldProps> = (
    {fieldName,handleChange, checked, positions}
) => {
    return (

        <>
            {positions.map(position =>
                <div className={'radio-buttons-container'} key={position.id}>
                    <label>
                        <input
                            type={'radio'}
                            name={fieldName}
                            value={position.id}
                            checked={checked===position.id}
                            onChange={(e)=>handleChange(position.id)}
                        />
                        <span>{position.name}</span>
                    </label>
                </div>
            )}
            <ErrorMessage name={'position'} className={'error-message'} component={'div'}/>
        </>
    )

}

type RadioButtonsFieldProps = {
    positions: Array<Position>
    fieldName: string
    checked: number
    handleChange:(value:number)=>void
}