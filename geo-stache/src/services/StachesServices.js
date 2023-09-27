import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


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
    
    async editStache(updates, stacheId) {
        const originalStache = await dbContext.Staches.findById(stacheId)
        if(!originalStache){
            throw new BadRequest(`No id at ${stacheId}`)
        }

        originalStache.name = updates.name || originalStache.name
        originalStache.description = updates.description || originalStache.description
        originalStache.difficulty = updates.difficulty || originalStache.difficulty
        originalStache.badgeImage = updates.badgeImage || originalStache.badgeImage
        originalStache.coverImage = updates.coverImage || originalStache.coverImage
        originalStache.tag = updates.tag || originalStache.tag
        originalStache.hint = updates.hint || originalStache.hint
        originalStache.location = updates.location || originalStache.location

        await originalStache.save()
        
        return originalStache
    }
    
    async deleteStache(stacheId, userId) {
        const stache = await dbContext.Staches.findById(stacheId)
        if(userId != stache.accountId){
            throw new Forbidden('Not yours!')
        }
        await stache.remove()
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