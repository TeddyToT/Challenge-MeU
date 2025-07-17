const AcccessService = require('../services/accessService')


class UserController {

    signUp = async (req, res,next) => {
        try {
            return res.status(201).json(await AcccessService.signUp(req.body))
        } catch (error) {
            next(error)
        }
    }

    logIn = async (req, res,next) => {
        try {
            return res.status(201).json(await AcccessService.logIn(req.body))
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new UserController()