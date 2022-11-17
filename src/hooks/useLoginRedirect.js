import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const useLoginRedirect = (isLoginIn) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isLoginIn) {
            return navigate('/login')
        }
    }, [navigate, isLoginIn])
}

export default useLoginRedirect