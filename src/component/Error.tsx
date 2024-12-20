import { useNavigate } from "react-router"
import "../style/error.css"

const Error = () => {

    const navigate = useNavigate()
    const navigateHome = () => {
        navigate('/home');
    }

    return <div className="containerError">
        <h1 className="errorTitle">404 Error</h1>
        <p>It so sad you can't find the website you want</p>
        <button className="errorButton" onClick={navigateHome}>BACK TO HOME</button>
    </div>

}

export default Error