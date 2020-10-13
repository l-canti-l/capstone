 //middleware for route that doesnt exist
const notFound = (request, response, next) => {
    const error = new Error(`Not Found: ${request.originalUrl}`)
    response.status(404)
    next(error)
}


const handler = (err, request, response, next) => {
    //if code is 200 change to 500 (server error) else what code is
    const statusCode = response.statusCode === 200 ? 500 : response.statusCode
    //set status to what code is
    response.status(statusCode)
    //respond with json message
    response.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { notFound, handler }