class Middleware{
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(" ").pop()
        
    }
}