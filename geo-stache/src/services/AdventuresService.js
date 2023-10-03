import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { stachesService } from "./StachesServices.js"


class AdventuresService {

    // NOTE Add Stache to our To Do List!
    async createAdventure(adventureData) {
        const stache = await stachesService.getStacheById(adventureData.stacheId)
        // FIXME add in logic for archived/deleted if we set that on the stache schema
        // if (!stacheId == stache.id) {
        //     throw new Forbidden(`${stache.stacheName} has been deleted by its creator`)
        // }

        const newAdventure = await dbContext.Adventures.create(adventureData)
        await newAdventure.populate('profile', 'name status')
        return newAdventure
    }

    // NOTE This gets all the Staches that the current profile has marked as either ToDo or Found.
    async getAdventuresByUserId(userId) {
        const stacheAdventures = await dbContext.Adventures.find({ accountId: userId }).populate('stache profile')
        return stacheAdventures
    }


    // NOTE Allows us to remove an adventure, this is on the User's Profile page, or maybe even the Stache Details Page. They must be the creator of the Adventure.
    async deleteAdventureById(adventureId, userId) {
        const adventureToBeRemoved = await dbContext.Adventures.findById(adventureId)

        if (!adventureToBeRemoved) {
            throw new BadRequest(`The Adventure with id ${adventureId} does not exist.`)
        }
        if (adventureToBeRemoved.accountId != userId) {
            throw new Forbidden(`You cannot remove and Adventure you didn't create.`)
        }
        await adventureToBeRemoved.remove()
        return adventureToBeRemoved

    }

    // NOTE allows us to view all adventures(users) of both status(todo and found) on a Stache Details Page
    // NOTE see this logic started on the Stache's Controller



    // FIXME check with Sam on this to verify it is good.
    // NOTE allows us to update from todo to found and user can complete their adventure!
    async editAdventure(adventureId, userId) {
        const originalAdventure = await dbContext.Adventures.findById(adventureId)
        if (!originalAdventure) throw new Error(`No Adventure at that Id${adventureId}`)
        if (originalAdventure.accountId != userId) {
            throw new Forbidden(`You cannot remove and Adventure you didn't create.`)
        }
        // originalAdventure.status = updates.status || originalAdventure.status
        originalAdventure.status = 'completed'
        originalAdventure.foundDate = new Date()
        await originalAdventure.save()
        return originalAdventure
    }

    async getAdventures() {
        const adventures = await dbContext.Adventures.find()
            .populate('creator', 'stache')
        return adventures
    }

    async getAdventuresByStacheId(stacheId) {
        const adventures = await dbContext.Adventures.find({ stacheId }).populate('profile', 'name status', 'stache')
        return adventures

    }

}

export const adventuresService = new AdventuresService()