import './CommonElements.sass'
import {useSelector} from "react-redux"
import {testAppSelector} from "../../redux/selectors"
import {useAppDispatch} from "../../redux/redux-store"
import {getUsers} from "../../redux/main-reducer"


export const ShowMoreButton = () => {
    const {totalPages,nextPage} = useSelector(testAppSelector.searchData)
    const isLoading = useSelector(testAppSelector.isLoadingUsers)
    const dispatch = useAppDispatch()
    function getMoreUsers(){
       !isLoading && dispatch(getUsers(nextPage))
    }
    if(!totalPages || nextPage>totalPages )return <></>
    return (
        <button
            className={`primary-button`}
            onClick={getMoreUsers} disabled={isLoading}
        >
            Show more
        </button>
    )

}

