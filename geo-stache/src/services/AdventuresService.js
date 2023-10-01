import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { stachesService } from "./StachesServices.js"


class AdventuresService {
    async createAdventure(adventureData) {
        const stache = await stachesService.getStacheById(adventureData.stacheId)
        // if (!stacheId == stache.id) {
        //     throw new Forbidden(`${stache.stacheName} has been deleted by its creator`)
        // }

        const newAdventure = await dbContext.Adventures.create(adventureData)
        await newAdventure.populate('profile', 'name status')
    }



}

export const adventuresService = new AdventuresService()