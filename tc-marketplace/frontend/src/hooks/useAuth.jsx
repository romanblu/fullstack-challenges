import { useContext, useState } from "react"
import { AuthContext } from '../context/AuthContext'
import { loginUser } from "../services/auth"

export const useAuth = () => {
    const { setUser } = useContext(AuthContext)
    const [loading, setLoading ] = useState(false)
    const [error, setError] = useState("")

    const login = async (formData) => {

        setLoading(true)
        setError("")

        try{
            const data = await loginUser(formData)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user)
            return data.user
        }catch(err){
            console.error(err)
            setError("Login failed", err)
        }finally{
            setLoading(false)
        }
     
    }
    
    return { login, loading, error}
}