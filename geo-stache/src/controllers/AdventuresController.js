import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { adventuresService } from "../services/AdventuresService.js"
import { stachesService } from "../services/StachesServices.js"
import { Logger } from "../utils/Logger.js"


export class AdventuresController extends BaseController {
    constructor() {
        super('api/adventures')
        this.router
            .get('', this.getAdventures)
            .get('/:adventureId', this.getAdventureById)
            .delete('/:adventureId', this.deleteAdventureById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createAdventure)
            .put('/:adventureId', this.editAdventure)


    }

    async getAdventures(request, response, next) {
        try {
            const adventures = await adventuresService.getAdventures()
            return response.send(adventures)
        } catch (error) {
            next(error)
        }
    }
    async getAdventuresByUserId(req, res, next) {
        try {
            const userId = req.userInfo.id
            const adventure = await adventuresService.getAdventuresByUserId(userId)
            res.send(adventure)
        } catch (error) {
            next(error)
        }
    }


    async editAdventure(request, response, next) {
        try {
            const userId = request.userInfo.id
            const adventureId = request.params.adventureId
            // @ts-ignore
            const editedAdventure = await adventuresService.editAdventure(adventureId, userId)
            console.log('edited adventure', editedAdventure)
            response.send(editedAdventure)
        } catch (error) {
            next(error)
        }


    }

    async getAdventureById(req, res, next) {
        try {
            const adventureId = await adventuresService.getAdventureById(req.params.adventureId)
            res.send(adventureId)
        } catch (error) {
            next(error)
        }
    }

    // referenced the PostIt Collaborator createCollab summer 23
    async createAdventure(request, response, next) {
        try {
            const adventureData = request.body;
            console.log('did we get the adventure data', adventureData);

            // Check if request.userInfo is valid
            if (!request.userInfo || !request.userInfo.id) {
                throw new Error('Invalid user information.');
            }

            adventureData.accountId = request.userInfo.id;
            const adventure = await adventuresService.createAdventure(adventureData);

            console.log('Created adventure?', adventure);
            return response.send(adventure);
        } catch (error) {
            next(error);
        }
    }


    async deleteAdventureById(request, response, next) {
        try {

            const adventure = await adventuresService.deleteAdventureById(request.params.adventureId)
            return response.send(adventure)
        } catch (error) {
            next(error)
        }
    }

}