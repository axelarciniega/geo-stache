import { AppState } from "../AppState"
import { Stache } from "../models/Stache"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"






class ProfilesService{

// ANCHOR ONLY USE THE PROFILE MODEL IN THIS SERVICE

// TODO need method to get profile by Id
async getStachesByProfileId(profileId){
  try {
    const res = await api.get(`api/profiles/${profileId}/staches`)
    logger.log(res.data, 'trying to get staches by id')
    AppState.activeProfileStaches = res.data
  } catch (error) {
    Pop.error(error)
  }
}

}

export const profilesService = new ProfilesService()