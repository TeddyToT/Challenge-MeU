const AccessService = require('../services/accessService')


class UserController {

    signUp = async (req, res,next) => {
        try {
            const user = await AccessService.signUp(req.body)
            return res.status(201).json({success:user?.success, message:user?.message})


        } catch (error) {
            next(error)
        }
    }

    logIn = async (req, res,next) => {
        try {
            const result = await AccessService.logIn(req.body)
            return res.status(200).json({
                success:result.success, user:result.user, accessToken:result.accessToken})
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new UserController()