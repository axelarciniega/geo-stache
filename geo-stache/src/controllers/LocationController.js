import { locationService } from "../services/LocationService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";



export class LocationController extends BaseController {
    constructor() {
        super('api/location')
        this.router
            // .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLocation)
            .get('', this.getLocation)
            .get('/:locationId', this.getLocationById)
    }

    async createLocation(req, res, next) {
        try {
            let locationBody = req.body
            // locationBody.creatorId = req.userInfo.id
            const stash = await locationService.createLocation(locationBody)
            res.send(stash)
        } catch (error) {
            next(error)
        }
    }

    async getLocation(req, res, next) {
        try {
            let locationBody = req.body
            const stash = await locationService.getLocation(locationBody)
            res.send(stash)
        } catch (error) {
            next(error)
        }


    }

    async getLocationById(req, res, next) {
        try {
            const location = await locationService.getLocationById(req.params.locationId)
            res.send(location)
        } catch (error) {
            next(error)
        }
    }


}