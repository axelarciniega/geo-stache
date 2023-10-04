import { AppState } from "../AppState.js"
import { Adventure } from "../models/Adventure.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdventuresService {

    async addAdventure(adventureData) {
        const response = await api.post('api/adventures', adventureData)
        logger.log('new adventure!', response.data)
        const newAdventure = new Adventure(response.data)

        AppState.activeStacheAdventures.push(newAdventure)
        AppState.myAdventures.push(newAdventure)
    }

    async getAdventuresByStacheId(stacheId) {
        const response = await api(`api/staches/${stacheId}/adventures`)
        logger.log('getting those adventures by Stache', response.data)
        AppState.activeStacheAdventures = response.data

    }
    async deleteAdventure(adventureId) {
        logger.log(adventureId)
        const response = await api.delete('api/adventures', adventureId)
        logger.log('[DELETING ADVENTURE]', response.data)
        AppState.myAdventures = AppState.myAdventures.filter(a => a.id != adventureId)

    }


    async completeAdventure(adventureId) {
        const response = await api.put(`api/adventures/${adventureId}`)
        logger.log('Complete Adventure PUT request', response.data)

        let indexToAdd = AppState.myAdventures.findIndex(a => a.id == adventureId)
        logger.log('index to add', indexToAdd)
        const newAdventureData = new Adventure(response.data)


        AppState.myAdventures.splice(indexToAdd, 1, newAdventureData)
        logger.log('Completed Adventure Added', AppState.myAdventures)

    }


}
export const adventuresService = new AdventuresService()