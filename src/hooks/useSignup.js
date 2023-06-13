import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email, password, displayName, profilePic) => {
        setError(null)
        setIsPending(true)
    
        try {
            // signup
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }
            console.log(res.user)

            // upload user profilePic
            const uploadPath = `profilePic/${res.user.uid}/${profilePic.name}`
            const img = await projectStorage.ref(uploadPath).put(profilePic)
            const imgUrl = await img.ref.getDownloadURL()

            // add display AND PHOTO_URL name to user
            await res.user.updateProfile({ displayName, photoURL: imgUrl })

            // create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({ 
                online: true,
                displayName,
                photoURL: imgUrl,
            })

            console.log(isCancelled)

            if (!isCancelled) {
                console.log("isPending updated")
                setIsPending(false)
                setError(null)
            }
        } 
        catch(err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { signup, error, isPending }
}