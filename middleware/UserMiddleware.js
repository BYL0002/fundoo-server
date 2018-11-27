
exports.register = (req) => {
    try {
        if(req.body === null || req.body === undefined || req.body === "") throw 'Something Left Unhandled'
        {
            next();
        }
    }
    catch(err) {
        console.log();
        next(err);
    }
}

exports.login = (req) => {

}