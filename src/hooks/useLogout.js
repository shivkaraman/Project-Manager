import {  useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import useAuthContext from "./useAuthContext";

export default function useLogout () {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)
    const { user, dispatch } = useAuthContext()

    const logout = async () => {
        setIsPending(true)
        setError(null)
        try{
            const uid = user.uid
            await projectFirestore.collection('users').doc(uid).update({onlline: false})

            await projectAuth.signOut()
            dispatch({type : 'LOGOUT'})

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if(!isCancelled){
                setIsPending(false)
                setError(err.message)
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => {
            setIsCancelled(true)
        };
    }, []);

    return { isPending, error, logout}
}