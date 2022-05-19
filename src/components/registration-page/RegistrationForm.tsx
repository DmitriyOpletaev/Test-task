import * as Yup from "yup"
import { Form, Formik} from "formik"
import {TextField} from "../common/TextField"
import {RadioButtonsField} from "../common/RadioButtonsField"
import {PhotoUploadField} from "../common/PhotoUploadField"
import {SignUpButton} from "../common/SignUpButton"
import {testAppSelector} from "../../redux/selectors"
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import { registrationUser} from "../../redux/main-reducer";
import {emailRegExp, phoneRegExp} from "../../helpers/helpers";
import {AuthError} from "./AuthError";


const initialValues:Values = {
    name: '',
    email: '',
    phone: '',
    position: 0,
}
interface Values{
    name: string
    email: string
    phone: string
    position: number
    photo?:File
}
const validationSchema =(positions:number[])=> Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short name')
        .max(60, 'Too long name')
        .required('Name is required'),
    email: Yup.string()
        .matches(emailRegExp,'Invalid email')
        .required('Email is required'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Invalid phone number')
        .required('Phone number is required'),
    position: Yup.number()
        .oneOf(positions)
        .required('Change your position'),
    photo: Yup.mixed().required()
})

export const RegistrationForm = () => {
    const positions = useAppSelector(testAppSelector.positions)
    const isLoadingAuthorization = useAppSelector(testAppSelector.isLoadingAuthorization)
    const dispatch = useAppDispatch()
    function submit(values: Values) {
        const {name, email, position, phone,photo} = values
        photo && dispatch(registrationUser(name,email,phone,position,photo))
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(positions.map(e=>e.id))}
            onSubmit={values => submit(values)}
        >
            {({
                  values,
                  setFieldValue,
                  errors,
                  touched
              }) => (
                <Form autoComplete={'off'}>
                    <TextField isError={!!errors.name && touched.name} fieldName={'name'} fieldValue={values.name}/>
                    <TextField isError={!!errors.email && touched.email} fieldName={'email'} fieldValue={values.email}/>
                    <TextField
                        exampleText={'+38 (XXX) XXX - XX - XX'}
                        isError={!!errors.phone && touched.phone}
                        fieldName={'phone'}
                        fieldValue={values.phone}
                    />
                    <div className={'user-position-radio-input-container'}>
                        <div className={'radio-group-title'}>
                            Select your position
                        </div>
                        <RadioButtonsField
                            handleChange={(value:number)=>setFieldValue('position',value)}
                            fieldName={'position'}
                            positions={positions}
                            checked={values.position}
                        />
                    </div>
                    <div className={'photo-upload-field-wrapper'}>
                        <PhotoUploadField
                            fieldName={'photo'}
                            uploadFile={(file:File|null)=>{setFieldValue('photo',file)}}
                        />
                    </div>
                    <div className={'submit-button-container'}>
                        <AuthError/>
                        <SignUpButton type={'submit'} disabled={isLoadingAuthorization}/>
                    </div>
                </Form>
            )}
        </Formik>
    )
}


