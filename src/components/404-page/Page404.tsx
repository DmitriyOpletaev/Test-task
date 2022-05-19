import './Page404.sass'

export const Page404 = () => {

    function reloadPage(){
        document.location.reload()
    }
    return (
        <div className={'page-404'}>
            <h1>
                Something went wrong
            </h1>
            <button onClick={reloadPage}>
                Reload page
            </button>
        </div>
    )

}

type Page404Props = {}