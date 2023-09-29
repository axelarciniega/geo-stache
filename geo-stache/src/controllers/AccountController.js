import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:accountId', this.getUserLocation)
      .put('/:accountId', this.updateAccount)
  }

  // NOTE ⬇️ edit account / profile logic
  // NOTE pass entire req.userInfo here
  async updateAccount(request, response, next) {
    try {
      const updates = request.userInfo
      const accountId = request.params.accountId// or is it userInfo? or Id?
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
