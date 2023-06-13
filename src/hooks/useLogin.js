import { useEffect, useState } from "react";
import { projectAuth } from '../firebase/config'

export default function useLogin() {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    
    const login = async (email, password) => {
        setIsPending(true)
        setError(null)
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            
            if(!res){
                throw new Error ('Failed to login ')
            }
            console.log(res.user)

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if(!isCancelled){
                console.log("Error : " ,err.message) 
                setIsPending(false)
                setError(err.message)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { isPending, error, login }
}