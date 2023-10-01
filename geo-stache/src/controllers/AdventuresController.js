import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { adventuresService } from "../services/AdventuresService.js"


export class AdventuresController extends BaseController {
    constructor() {
        super('api/adventures')
        this.router
        // .get('/adventureId', this.getAdventureByStacheId)
        // .use(Auth0Provider.getAuthorizedUserInfo)
        // .post('', this.postNewAdventure)
        // .delete('/:adventureId', this.deleteAdventureByAdventureId)


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


}