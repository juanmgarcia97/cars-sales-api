function errorHandler (err, req, res, next) {
    res.status(401).json({
        message: err.message
    })
}

module.exports = {errorHandler}