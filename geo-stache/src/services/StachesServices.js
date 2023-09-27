import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class StachesService {
    async async getStacheById(stacheId) {
        const stache = await dbContext.Staches.findById(stacheId)
        await stache.populate('creator')
        return stache
    }
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


    async logStache(stacheId) {
        const stache = await this.getStacheById(stacheId)
        // if(stache.location != userId) throw new Forbidden("That's not your purse I don't know you!")


        stache.found = !stache.found
        await stache.save()
        return stache
    }

}

export const stachesService = new StachesService()