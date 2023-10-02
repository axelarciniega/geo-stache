import { AppState } from "../AppState.js"
import { Adventure } from "../models/Adventure.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdventuresService {

    async addAdventure(adventureData) {
        const response = await api.post('api/adventures', adventureData)
        logger.log('new adventure!', response.data)
const newAdventure = new Adventure(response.data)

        AppState.myAdventures.push(newAdventure)
        AppState.activeStacheAdventures.push(newAdventure)
    }

// completeAdventure(adventureId){
    // TODO find adventure in app state
    // TODO change adventure.status = 'completed'
    // TODO change adventure.foundDate = Date.now()
    // TODO send put request ('api/adventures/adventureId, foundadventure)
    // TODO  do a splice to get reactive change to see that flip on the page
// }


}
export const adventuresService = new AdventuresService()