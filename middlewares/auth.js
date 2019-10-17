const {VerifyToken} = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next){
    try {
        let decodedToken = VerifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    }
    catch(err) {
        next(err)
    }
}

function authorization(req, res, next){
    // let {id} = req.params
    // Wp.findOne({_id:id})
    //     .then(article => {
    //         if(article.user == req.loggedUser._id) {
    //             next()
    //         } else{
    //             throw {
    //                 status: 401,
    //                 msg: "not authorized"
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
}

module.exports = {authentication, authorization} 