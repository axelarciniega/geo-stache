import { AppState } from "../AppState.js"
import { Stache } from "../models/Stache.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class StachesService {
    // NOTE ⬇️this is the Active Stache renderd on the StacheDetailsPage
    async getStacheById(stacheId) {
        const res = await api.get(`api/staches/${stacheId}`);
        // logger.log(res.data);
        AppState.activeStache = new Stache(res.data);
    }

    async getStaches() {
        try {
            const res = await api.get('api/staches');
            // logger.log(res.data);
            AppState.staches = res.data.staches.map(s => new Stache(s));
            AppState.nextUrl = res.data.next
            AppState.previousUrl = res.data.previous
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
            // logger.log(res.data);
            const newStache = new Stache(res.data);
            AppState.staches.unshift(newStache);
            return newStache
        } catch (error) {
            logger.error(error);
        }
    }


    async editStache(updateData, stacheId) {
        const res = await api.put('/staches', updateData)
        // logger.log('edited data', res.data)
        const updatedStache = new Stache(res.data)
        let originalStacheIndex = AppState.staches.findIndex(stache => stache.id == stacheId)
        AppState.staches.splice(originalStacheIndex, 1, updatedStache)

    }

    async deleteStache(stacheId) {
        // logger.log('deleting')
        const res = await api.delete(`api/staches/${stacheId}`)
        // logger.log('deleting', res.data)
    }

    async makeStacheEditable(updateData, stacheId) {
        const res = await api.put(`api/staches/${stacheId}`, updateData)
        // logger.log('edited data', res.data)
        const updatedStache = new Stache(res.data)
        let originalStacheIndex = AppState.staches.findIndex(stache => stache.id == stacheId)
        AppState.staches.splice(originalStacheIndex, 1, updatedStache)
        AppState.activeStacheToEdit = AppState.activeStache
        AppState.activeStache = updatedStache
    }
    setEditStacheToNull() {
        AppState.activeStacheToEdit = null
    }

    async ChangePage(url){
        const res = await api.get(url)
        AppState.staches = res.data.staches.map(stache => new Stache(stache))
        AppState.nextUrl = res.data.next
        AppState.previousUrl = res.data.previous

    }
}

export const stachesService = new StachesService();
