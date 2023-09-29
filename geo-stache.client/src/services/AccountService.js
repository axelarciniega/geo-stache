import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      logger.log('[GETTING ACCOUNT]', res.data)
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async editProfile(formData) {
    logger.log('Is this on?')
    // const response = await api.put('/account', formData)
    // logger.log('account service editing profile data')
    // let updateAccount = new Account(response.data)
    // AppState.account = updateAccount
}

}

export const accountService = new AccountService()
