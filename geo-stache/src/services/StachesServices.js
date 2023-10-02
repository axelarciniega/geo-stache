import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class StachesService {
   
    async getStaches(query) {
        const staches = await dbContext.Staches.find(query).sort('-createdAt').populate('creator')
        return staches
    }
    async getStacheById(stacheId) {
        const stache = await dbContext.Staches.findById(stacheId)
        await stache.populate('creator')
        return stache
    }

     async getStachesByProfileId(profileId) {
      const staches = await dbContext.Staches.find({creatorId : profileId})
      return staches
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
        if (!originalStache) {
            throw new BadRequest(`No id at ${stacheId}`)
        }

        originalStache.stacheName = updates.stacheName || originalStache.stacheName
        originalStache.description = updates.description || originalStache.description
        originalStache.difficulty = updates.difficulty || originalStache.difficulty
        originalStache.badgeImage = updates.badgeImage || originalStache.badgeImage
        originalStache.coverImage = updates.coverImage || originalStache.coverImage
        originalStache.hint = updates.hint || originalStache.hint
        originalStache.location = updates.location || originalStache.location

        await originalStache.save()

        return originalStache
    }

    // TODO could we add an archived logic to this and add a boolean to our Schema?
    async deleteStache(stacheId, userId) {
        const stache = await dbContext.Staches.findById(stacheId)
        if (userId != stache.creatorId) {
            throw new Forbidden('Not yours!')
        }
        await stache.remove()
    }


    async getMyStaches(userId) {
        const myStaches = await dbContext.Staches.find({ accountId: userId }).populate('creator')
        return myStaches
    }



    async logStache(stacheId) {
        const stache = await dbContext.Comments.find({ stacheId }).populate('creator stache')


        return stache
    }

}

export const stachesService = new StachesService()