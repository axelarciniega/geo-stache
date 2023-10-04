<template>
  <span class="navbar-text">
    <button class="btn selectable txt-Sand lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="no-Pointer border-0 fnt-Cabin txt-Sand" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40"
              class="rounded selectable m-1 txt-Sand ftn-Cabin" />
            {{ account.name }}
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0 fnt-Cabin txt-Sand"
          aria-labelledby="authDropdown">
          <div class="list-group ftn-Cabin txt-Sand">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action bg-Sand fnt-Cabin txt-DrkGreen">
                Manage Account
              </div>
            </router-link>
            <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">
              <div class="list-group-item dropdown-item list-group-item-action bg-Sand fnt-Cabin txt-DrkGreen">View Profile</div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action bg-Sand ftn-Cabin txt-DrkGreen selectable"
              @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// NOTE custom class to ensure that cursor only points on user image and not entire row that the button appears in. Also removed 'selectable' and 'no-select' classes from the image button div (line 9), added selecable to the image class directly, and added our no-Pointer class as well.
.no-Pointer {
  cursor: default !important;
}
</style>
