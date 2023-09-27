import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { stachesService } from "../services/StachesServices.js";





export class StacheController extends BaseController {
    constructor() {
        super('api/staches')
        this.router
            // .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createStache)
            .get('/:stacheId', this.getLocationByStacheId)
    }


    async createStache(req, res, next) {
        try {
            let stacheBody = req.body
            stacheBody.creatorId = req.userInfo.id
            const stache = await stachesService.createStache(stacheBody)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }

    async getLocationByStacheId(req, res, next) {
        try {
            const stacheLocation = await stachesService.getLocationByStacheId(req.params.stacheId)
            res.send(stacheLocation)
        } catch (error) {
            next(error)
        }
    }


}