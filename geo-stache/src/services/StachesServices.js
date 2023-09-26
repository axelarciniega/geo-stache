import { dbContext } from "../db/DbContext.js"


class StachesService{
    async createStache(stacheBody) {
        const stache = await dbContext.Staches.create(stacheBody)
        await stache.populate('creator')
        return stache 
    }

}

export const stachesService = new StachesService()