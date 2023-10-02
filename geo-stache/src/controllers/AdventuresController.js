import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { adventuresService } from "../services/AdventuresService.js"


export class AdventuresController extends BaseController {
    constructor() {
        super('api/adventures')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createAdventure)
            .delete('/:adventureId', this.deleteAdventureById)
        // TODO add put request


    }

    // modeled off the PostIt Collaborator createCollab summer 23
    async createAdventure(request, response, next) {
        try {
            const adventureData = request.body
            adventureData.accountId = request.userInfo.id
            const adventure = await adventuresService.createAdventure(adventureData)
            return response.send(adventure)
        } catch (error) {
            next(error)
        }

    }

    async deleteAdventureById(request, response, next) {
        try {
            const adventureId = request.params.adventureId
            const userId = request.userInfo.id
            const adventure = await adventuresService.deleteAdventureById(adventureId, userId)
            return response.send(adventure)
        } catch (error) {
            next(error)
        }
    }

}