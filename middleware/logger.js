const loggerMiddleWare =  (request,response,next) => {
    //destrutturiamo le proprietà che ci servono
    const {url,ip,method} = request

    console.log(`${new Date().toISOString()} Request: ${method} to endpoint: ${url} from ip ${ip}`);

    next()
}

module.exports = loggerMiddleWare