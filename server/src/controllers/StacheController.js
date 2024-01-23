import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { stachesService } from "../services/StachesServices.js";
import { commentsService } from "../services/CommentsService.js";
import { adventuresService } from "../services/AdventuresService.js";






export class StacheController extends BaseController {
    constructor() {
        super('api/staches')
        this.router

            .get('/:stacheId', this.getStacheById)
            .get('', this.getStaches)
            .get('/:stacheId', this.getLocationByStacheId)
            .get('/:stacheId/comments', this.logStache)
            .get('/:stacheId/adventures', this.getAdventuresByStacheId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createStache)
            .put('/:stacheId', this.editStache)
            .delete('/:stacheId', this.deleteStache)
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

    async getStaches(req, res, next) {
        try {
            const pageNumber = req.query.pageNumber
            delete req.query.pageNumber
            const staches = await stachesService.getStaches(req.query, pageNumber)
            res.send(staches)
        } catch (error) {
            next(error)
        }
    }


    async editStache(req, res, next) {
        try {
            const updates = req.body
            const stacheId = req.params.stacheId
            const stache = await stachesService.editStache(updates, stacheId)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }

    async deleteStache(req, res, next) {
        try {
            const stache = await stachesService.deleteStache(req.params.stacheId, req.userInfo.id)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }

    async getStacheById(req, res, next) {
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
            const stache = await stachesService.logStache(req.params.stacheId)
            res.send(stache)
        } catch (error) {
            next(error)
        }
    }

    // NOTE see this logic continued on the Adventures Service
    async getAdventuresByStacheId(request, response, next) {
        try {
            const stacheId = request.params.stacheId
            const adventures = await adventuresService.getAdventuresByStacheId(stacheId)
            return response.send(adventures)
        } catch (error) {
            next(error)
        }

    }


}