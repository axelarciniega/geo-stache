import { adventuresService } from '../services/AdventuresService.js'
import { profileService } from '../services/ProfileService.js'
import { stachesService } from '../services/StachesServices.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      // TODO add routes for getting data created by other users
      .get('/:profileId/staches', this.getStachesByProfileId)
      .get('/:profileId/adventures', this.getAdventuresByProfileId)

  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getStachesByProfileId(req, res, next) {
    try {
      const staches = await stachesService.getStachesByProfileId(req.params.profileId)
      res.send(staches)
    } catch (error) {
      next(error)
    }
  }

  async getAdventuresByProfileId(req, res, next) {
    try {
      const adventures = await adventuresService.getAdventuresByUserId(req.params.profileId)
      res.send(adventures)
    } catch (error) {
      next(error)
    }
  }
}
