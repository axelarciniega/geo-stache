import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { stachesService } from "../services/StachesServices.js";





export class StacheController extends BaseController{
    constructor(){
        super('api/staches')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createStache)
    }


    async createStache(req,res,next){
        try {
            let stacheBody = req.stacheBody
            stacheBody.creatorId = req.userInfo.id
            const stache = await stachesService.createStache(stacheBody)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }


}