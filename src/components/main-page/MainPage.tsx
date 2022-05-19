import {FC} from "react"
import './MainPage.sass'
import {SignUpButton} from "../common/SignUpButton"
import {useAppSelector} from "../../redux/redux-store";
import {testAppSelector} from "../../redux/selectors";

export const MainPage: FC<MainPageProps> = ({buttonCallbackFunction}) => {
    const isUserAuthorise=useAppSelector(testAppSelector.isUserAuthorise)
    return (
        <div className={'main-page-wrapper'}>

            <div className={'main-page__content-container'}>
                <h1>
                    Test assignment for front-end developer
                </h1>
                <p>
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
                    vast understanding of User design thinking as they'll be building web interfaces with accessibility
                    in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                    <div>
                          <SignUpButton onClickCallback={buttonCallbackFunction} disabled={isUserAuthorise}/>
                    </div>
            </div>
        </div>
    )

}

type MainPageProps = {
    buttonCallbackFunction?: () => void
}