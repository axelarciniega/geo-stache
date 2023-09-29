
import { AppState } from "../AppState.js"
import { Stache } from "../models/Stache.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class StachesService {
    // NOTE ⬇️this is the Active Stache renderd on the StacheDetailsPage
    async getStacheById(stacheId) {
        const res= await api.get(`api/staches/${stacheId}`)
        logger.log(res.data)
        AppState.activeStache = new Stache(res.data)

    }

    async getStaches() {
        // debugger
        const res = await api.get('api/staches')
        logger.log(res.data)
        AppState.staches = res.data.map(s => new Stache(s))
    }

    async createStache(stacheData){
        const res = await api.post('api/staches', stacheData)
        logger.log(res.data)
        const newStache = new Stache(res.data)
        AppState.staches.unshift(newStache)
    }
}
export const stachesService = new StachesService()