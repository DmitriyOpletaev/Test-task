import './RegistrationPage.sass'
import {RegistrationForm} from "./RegistrationForm"
import successImage from '../../assets/success-image.svg'
import {useSelector} from "react-redux";
import {testAppSelector} from "../../redux/selectors";

export const RegistrationPage = () => {
    const isUserAuthorise = useSelector(testAppSelector.isUserAuthorise)
    if(isUserAuthorise)return (
        <div className={'registration-page-wrapper'}>
            <h1>
                User successfully registered
            </h1>
            <div className={'success-registration-block'}>
                <img src={successImage} alt={'Upload successfully'}/>
            </div>
        </div>
    )
    return (
        <div className={'registration-page-wrapper'}>
            <div>
                <h1>
                    Working with POST request
                </h1>
                <div className={'registration-block-container'}>
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    )
}
