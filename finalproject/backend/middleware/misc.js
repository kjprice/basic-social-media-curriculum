function sendError(res, error, statusCode = 400) {
    let errorMessage;
    if (error.message) {
        errorMessage =  `Unknown error (${error.message})`;
    } else if (error.error) {
        errorMessage = error.error;
    } else {
        errorMessage = error;
    }

    res.status(statusCode);
    res.send({errorMessage})
}

module.exports = {sendError};