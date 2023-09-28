import { AppState } from "../AppState"
import { Stache } from "../models/Stache"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class StachesService {
    // NOTE ⬇️this is the Active Stache renderd on the StacheDetailsPage
    async getStacheById() {


    }

    async createStache(stacheData){
        const res = await api.post('api/staches', stacheData)
        logger.log(res.data)
        const newStache = new Stache(res.data)
        AppState.staches.unshift(newStache)
    }
}
export const stachesService = new StachesService()