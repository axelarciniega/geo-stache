import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { stachesService } from "../services/StachesServices.js";
import { commentsService } from "../services/CommentsService.js";






export class StacheController extends BaseController {
    constructor() {
        super('api/staches')
        this.router
            // .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createStache)
            .get('/:stacheId', this.getLocationByStacheId)
            .get('/:stacheId', this.getStacheById)
            .get('/:stacheId', this.findCommentsByStacheId)

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

    getStacheById(req, res, next) {
        try {
            const stacheId = await stachesService.getStacheById(req.params.stacheId)
            res.send(stacheId)
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
    async logStache(req, res, next) {
        try {
            const stache = await stachesService.logStache.(req.params.stacheId, req.userInfo.id)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }

    async findCommentsByStacheId(req, res, next) {
        try {
            const stacheId = req.params.stacheId
            const comments = await commentsService.findCommentsByStacheId(stacheId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

}