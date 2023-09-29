import { AppState } from "../AppState.js"
import { Stache } from "../models/Stache.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class StachesService {
    // NOTE ⬇️this is the Active Stache renderd on the StacheDetailsPage
    async getStacheById(stacheId) {
        const res = await api.get(`api/staches/${stacheId}`);
        logger.log(res.data);
        AppState.activeStache = new Stache(res.data);
    }

    async getStaches() {
        try {
            const res = await api.get('api/staches');
            logger.log(res.data);
            AppState.staches = res.data.map(s => new Stache(s));
        } catch (error) {
            logger.error(error);
        }
    }

    async createStache(stacheData) {
        // Create a GeoJSON Point object
        const location = {
            type: 'Point',
            coordinates: [stacheData.lng, stacheData.lat], // GeoJSON uses [longitude, latitude] order
        };

        // Add the location to stacheData
        stacheData.location = location;

        try {
            const res = await api.post('api/staches', stacheData);
            logger.log(res.data);
            const newStache = new Stache(res.data);
            AppState.staches.unshift(newStache);
            return newStache
        } catch (error) {
            logger.error(error);
        }
    }

async deleteStache(stacheId){
    // logger.log('deleting')
const res = await api.delete(`api/staches/${stacheId}`)
logger.log('deleting', res.data)
}

}

export const stachesService = new StachesService();
