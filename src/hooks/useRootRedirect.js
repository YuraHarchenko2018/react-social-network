import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const useRootRedirect = (isLoginIn) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoginIn) {
            return navigate('/')
        }
    }, [navigate, isLoginIn])
}

export default useRootRedirect