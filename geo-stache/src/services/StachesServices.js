import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class StachesService {

    async getStaches(query, pageNumber = 1) {
        const limit = 10
        const skip = ((pageNumber - 1) * limit)
        const staches = await dbContext.Staches.find(query)
            .sort('-createdAt')
            .populate('creator')
            .populate('todoCount foundCount')
            .skip(skip)
            .limit(limit)
        let count = await dbContext.Staches.countDocuments(query)
        let totalPages = Math.ceil(count / limit)

        return {
            staches,
            pageNumber: Number(pageNumber),
            totalPages,
            next: Number(pageNumber) == totalPages ? null : `http://localhost:3000/api/staches?pageNumber=${Number(pageNumber) + 1}`,
            previous: Number(pageNumber) == 1 ? null : `http://localhost:3000/api/staches?pageNumber=${Number(pageNumber) - 1}`
        }
    }
    async getStacheById(stacheId) {
        const stache = await dbContext.Staches.findById(stacheId)
        await stache.populate('creator')
        return stache
    }

    async getStachesByProfileId(profileId, pageNumber = 1) {
        // TODO add limit and skip BEFORE find
        const limit = 10
        const skip = ((pageNumber - 1) * limit)
        const staches = await dbContext.Staches.find({ creatorId: profileId })
            // TODO after find add lines 14-25
            .skip(skip)
            .limit(limit)
        let count = await dbContext.Staches.countDocuments(profileId)
        let totalPages = Math.ceil(count / limit)
        return {
            staches,
            pageNumber: Number(pageNumber),
            totalPages,
            next: Number(pageNumber) == totalPages ? null : `http://localhost:3000/api/profiles/${profileId}/staches?pageNumber=${Number(pageNumber) + 1}`,
            previous: Number(pageNumber) == 1 ? null : `http://localhost:3000/api/profiles/${profileId}/staches?pageNumber=${Number(pageNumber) - 1}`
        }
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