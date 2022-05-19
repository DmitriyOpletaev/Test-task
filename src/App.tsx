import React, {useEffect, useRef} from 'react'
import './App.sass'
import {MainPage} from "./components/main-page/MainPage"
import {UsersPage} from "./components/users-page/UsersPage"
import {RegistrationPage} from "./components/registration-page/RegistrationPage"
import logo from "./assets/Logo.svg"
import {UsersButton} from "./components/common/UsersButton"
import {SignUpButton} from "./components/common/SignUpButton"
import {useAppDispatch, useAppSelector} from "./redux/redux-store"
import {testAppSelector} from "./redux/selectors"
import {Preloader} from "./components/common/Preloader"
import {loadApp} from "./redux/main-reducer"
import {Page404} from "./components/404-page/Page404"


function App() {
    const isLoadingApp=useAppSelector(testAppSelector.isLoadingApp)
    const isUserAuthorise=useAppSelector(testAppSelector.isUserAuthorise)
    const userPageRef=useRef(null as HTMLDivElement|null)
    const registrationPageRef=useRef(null as HTMLDivElement|null)
    function navigateToUserPage(){
        userPageRef && userPageRef.current && userPageRef.current?.scrollIntoView({behavior:'smooth'})
    }
    function navigateToRegistrationPage(){
        registrationPageRef && registrationPageRef.current && registrationPageRef.current?.scrollIntoView({behavior:'smooth'})
    }
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(loadApp())
    },[])
    if(isLoadingApp)return <div className={'app-preloader-container'}><Preloader/></div>
    if(isLoadingApp===null)return <Page404/>
    return (
        <section className={'app'}>
            <div className={'header-wrapper'}>
                <div className={'header'}>
                    <img src={logo} alt={'Test task logo'}/>
                    <div className={'buttons-container'}>
                        <UsersButton onClickCallback={navigateToUserPage} />
                        <SignUpButton onClickCallback={navigateToRegistrationPage} disabled={isUserAuthorise}/>
                    </div>
                </div>
            </div>
            <div className={'content-wrapper'}>
                <MainPage buttonCallbackFunction={navigateToRegistrationPage}/>
                <div className={'secondary-pages-wrapper'}>
                    <div ref={userPageRef}>
                        <UsersPage/>
                    </div>
                    <div ref={registrationPageRef}>
                        <RegistrationPage/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default App
