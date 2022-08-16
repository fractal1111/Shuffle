const isValid = (value) => {

    if (typeof value != 'string') return false
    if (typeof value === 'undefined' || typeof value === null) { return false }

    if (typeof value === 'string' && value.trim().length == 0) { return false }

    return true
}

const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

module.exports={isValid,isValidEmail}