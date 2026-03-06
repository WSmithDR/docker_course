const validation = (userData) => {
    const errors = {}
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const regexPassword = /^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/
    if(!regexEmail.test(userData.email)){
        errors.email="Invalid e-mail..."
    }
    if(!userData.email){
        errors.email = "The email input cannot be empty..."
    }
    if(userData.email.length > 35){
        errors.email = "The email should not exceed 35 characters..."
    }

    if(!regexPassword.test(userData.password)){
        errors.password = "Invalid password..."
    }

    return errors
}

export default validation 