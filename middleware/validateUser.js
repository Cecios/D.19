const validateUser = (request, response, next) => {
    const error = []

    const  {
        userName,
        password,
        email,
        age,
        role,
    } = request.body

    if (typeof userName !== "string"){
        error.push('firstName must be a string')
    }
    if (typeof password !== "string" || password.length < 6){
        error.push('Invalid password')
    }
    //regex = regole che effettuano dei match sul testo o numeri utilizzati, cioè se la sintassi rispetta le regole
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        error.push('Invalid email')
    }
    if (typeof age !== "number"){
        error.push('age must be a number')
    }
    if (typeof role !== "string"){
        error.push('Invalid Role')
    }
    if (error.length > 0) {
        response.status(400).send({error})
    }else{
        next() //se non c'è nesun errore passiamo avanti
    }
}
module.exports = validateUser