import { AppState } from "../AppState"
import { Adventure } from "../models/Adventure"
import { Stache } from "../models/Stache"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"






class ProfilesService {

  // ANCHOR ONLY USE THE PROFILE MODEL IN THIS SERVICE

  // TODO need method to get profile by Id
  async getStachesByProfileId(profileId) {
    try {
      const res = await api.get(`api/profiles/${profileId}/staches`)
      // logger.log(res.data, 'trying to get staches by id')
      // AppState.activeProfileStaches = res.data
      // TODO after adding pagination to server ⬇️
      AppState.activeProfileStaches = res.data.staches.map(d=>new Stache(d))
      AppState.nextUrl = res.data.next
      AppState.previousUrl = res.data.previous

    } catch (error) {
      Pop.error(error)
    }
  }

  async getAdventuresByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/adventures`)
    // logger.log(res.data, '[GETTING PROFILE ADVENTURES]')
    AppState.activeProfileAdventures = res.data.map(d => new Adventure(d))
  }

  async ChangePage(url){
    const res = await api.get(url)
    AppState.activeProfileStaches = res.data.staches.map(stache => new Stache(stache))
    logger.log("profile change page",url)
    AppState.nextUrl = res.data.next
    AppState.previousUrl = res.data.previous

}

}

export const profilesService = new ProfilesService()