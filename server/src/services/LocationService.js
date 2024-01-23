import { DbConnection } from "../db/DbConfig.js"
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class LocationService {
    async getLocationByStacheId(locationId) {
        const getLocation = await dbContext.Location.findById(locationId)
        if (!getLocation) {
            throw new BadRequest("No Location with that ID")
        }
        return getLocation
    }
    async getLocation(locationBody) {
        const getLocation = await dbContext.Location.find(locationBody)
        return getLocation
    }

    async createLocation(locationBody) {
        const res = await dbContext.Location.create(locationBody)
        await res.populate('creator location')
        return res

    }

}


export const locationService = new LocationService()


// from Checkpoint :
// async getEvents(query) {
//   const events = await dbContext.Events.find(query).sort('-startDate').populate('creator ticketCount')
//   return events
// }