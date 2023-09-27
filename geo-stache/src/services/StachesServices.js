import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class StachesService {
    async createStache(stacheBody) {
        const stache = await dbContext.Staches.create(stacheBody)
        await stache.populate('creator')
        return stache
    }

    async getLocationByStacheId(stacheId) {
        const getLocation = await dbContext.Staches.findById(stacheId)
        if (!getLocation) {
            throw new BadRequest("No Location with that ID")
        }
        return getLocation
    }

}

export const stachesService = new StachesService()