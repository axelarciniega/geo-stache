import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Adventure } from '../models/Adventure'
import { logger } from '../utils/Logger'
import Pop from "../utils/Pop.js"
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
  async editAccount(updateData) {
    // logger.log('Is this on?')
    const response = await api.put('/account', updateData)
    logger.log('editing account',response.data)
}


  async getMyAdventures() {
    const res = await api.get('account/adventures')
    logger.log(res.data, '[GET MY ADVENTURES]')
    AppState.myAdventures =   res.data.map(d=>new Adventure(d))
}
async getProfileById(profileId){
try {
  const res = await api.get(`api/profiles/${profileId}`)
  logger.log(res.data)
  AppState.profile = res.data
} catch (error) {
  Pop.error(error)
}
}

}

export const accountService = new AccountService()
