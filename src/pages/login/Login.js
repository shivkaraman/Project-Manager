//styles 
import { useState } from 'react'
import './Login.css'
import useLogin from '../../hooks/useLogin'

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isPending, error, login } = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

        if(!error){
            setEmail('')
            setPassword('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='auth-form'>
            <h3>Login</h3>
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
            {isPending && <button className='btn' disabled>Loading</button>}
            {!isPending && <button className='btn' type="submit">Login</button>}
            {error && <p className='error'>{ error }</p>}
        </form>
    )
}