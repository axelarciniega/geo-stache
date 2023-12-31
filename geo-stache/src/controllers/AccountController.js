import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { stachesService } from "../services/StachesServices.js"
import { adventuresService } from '../services/AdventuresService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/staches', this.getMyStaches)
      .get('/adventures', this.getMyAdventures)
      .get('', this.getUserAccount)
      .get('/:accountId', this.getUserLocation)
      .put('', this.updateAccount)
  }
  async getMyAdventures(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const adventures = await adventuresService.getAdventuresByUserId(accountId)
      res.send(adventures)
    } catch (error) {
      next(error)
    }
  }

  // NOTE ⬇️ edit account / profile logic
  // NOTE pass entire req.userInfo here
  async updateAccount(request, response, next) {
    try {
      // TODO get data from request body
      const updates = request.body
      // FIXME pull their id from the userinfo
      const accountId = request.userInfo// or is it userInfo? or Id?
      const updatedAccount = await accountService.updateAccount(accountId, updates)
      response.send(updatedAccount)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserLocation(req, res, next) {
    try {

      const userLocation = await accountService.getUserLocation(req.params.accountId)
      res.send(userLocation)
    } catch (error) {
      next(error)
    }
  }

  async getMyStaches(req, res, next) {
    try {
      const myStaches = await stachesService.getMyStaches(req.userInfo.id)
      res.send(myStaches)
    } catch (error) {
      next(error)
    }
  }

  // async editAccount(req, res, next) {
  //   try {
  //     const updates = request.body
  //     const editAccount = await accountService.editAccount(req.updates)

  //     res.send(editAccount)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
