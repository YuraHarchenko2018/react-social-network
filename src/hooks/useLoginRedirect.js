import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoginInSelector } from "redux/selectors/auth";

const useLoginRedirect = () => {
    const navigate = useNavigate();
    const isLoginIn = useSelector(getIsLoginInSelector)

    useEffect(() => {
        if (!isLoginIn) {
            return navigate('/login')
        }
    }, [navigate, isLoginIn])
}

export default useLoginRedirect