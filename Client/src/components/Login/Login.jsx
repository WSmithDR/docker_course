import { useState } from "react"
import validation from "../Validation/validation"
import styledLogin from "./Login.module.css"

const Login = ({login})=> {
    //Local states
    const [userData, setUserData] = useState({email:"", password:""})
    const [errors, setErrors] = useState({})
    
    //handlers
    const handleChange=(event)=>{
        setUserData({...userData, [event.target.name]:event.target.value})
        const validateErrors = validation({
            ...userData, 
            [event.target.name]: event.target.value})
        
        setErrors(validateErrors)
    }
    const handleSubmit = (event)=> {
        event.preventDefault()
        login(userData)
    }

    //rendering
    return(
        <form onSubmit={handleSubmit} className={styledLogin.loginContainer}>
            <div>
                <label className={styledLogin.label} htmlFor="email">Email: </label>
                <input className={styledLogin.inputField} value={userData.email} name="email" type="email" onChange={handleChange}/>
                {errors.email && <p className={styledLogin.error}>{errors.email}</p>}
            </div>
            <div>
                <label className={styledLogin.label} htmlFor="password">Password: </label>
                <input className={styledLogin.inputField} value={userData.password} name="password" type="password" onChange={handleChange}/>
                {errors.password && <p className={styledLogin.error}>{errors.password}</p>}
            </div>
            <div>
                <button type="submit" className={styledLogin.loginButton}>Enviar</button>
            </div>
        </form>
    )
}

export default Login