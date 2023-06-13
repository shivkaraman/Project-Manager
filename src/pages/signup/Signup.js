//styles 
import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const [profilePicError, setProfilePicError] = useState(null)
    const { isPending, error, signup } = useSignup()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setDisplayName('')
        setProfilePic(null)
        setProfilePicError(null)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup (email, password, displayName, profilePic)
        {!error && resetForm()}
    }

    const handleFile = (e) => {
        setProfilePic(null)
        const selected = e.target.files[0]
        
        if(!selected){
            setProfilePicError('Select a profile picture')
            return
        }
        if(!selected.type.includes('image')){
            setProfilePicError('Select am image')
            return
        }
        if(selected.size > 100000){
            setProfilePicError('Select image of size less than 100KB')
            return
        }

        setProfilePicError(null)
        setProfilePic(selected)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>
                <span>Email</span>
                <input  
                    type="email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>Password</span>
                <input  
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                    required
                />
            </label>
            <label>
                <span>User Name</span>
                <input  
                    type="text"
                    onChange={(e) => {setDisplayName(e.target.value)}}
                    value={displayName}
                    required
                />
            </label>
            <label>
                <span>Profile Picture</span>
                <input  
                    type="file"
                    onChange={handleFile}
                    required
                />
                {profilePicError && <p className='file-error'> {profilePicError} </p>}
            </label>
            {isPending && <button className='btn' disabled>Loading</button>}
            {!isPending && <button className='btn' type="submit">Signup</button>}
            {error && <p className='error'>{ error }</p>}
        </form>
    )
}