import { useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {testAppSelector} from "../../redux/selectors";
import {actions} from "../../redux/main-reducer";
import './RegistrationPage.sass'
import {useAppSelector} from "../../redux/redux-store";

export const AuthError=()=>{
    const dispatch = useDispatch()
    const authError=useAppSelector(testAppSelector.authError)
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(actions.setAuthError(null))
        },5000)
        authError && dispatch(actions.setAuthError(null))
    },[authError])
    return(
        <div className={'auth-error'}>
            {authError}
        </div>
    )
}
