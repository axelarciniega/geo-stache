<template>
  <!-- Welcome -->
  <div class="container">
    <section class="row mt-2">
      <div class="col-4 rounded elevation-2 p-2">
        <h3>Welcome {{ account.name }}</h3>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-8">
        <h3>Account Details</h3>
        <form @submit.prevent="editProfile" class="row">

          <!-- Name -->
          <div class="mb-2 col-6">
            <label for="name">
              Name
            </label>
            <input v-model="editable.name" class="form-control" type="text">
          </div>


          <!-- Picture -->
          <div class="mb-2 col-6">
            <label for="picture">
              Avatar
            </label>
            <input v-model="editable.picture" class="form-control" type="text">
          </div>
          <!-- Lat -->
          <div class="mb-2 col-6">
            <label for="lat">
              Home or Preferred default Longitude
            </label>
            <input v-model="editable.lat" class="form-control" type="text">
          </div>

          <!-- Lng -->
          <div class="mb-2 col-6">
            <label for="lng">
              Home or Preferred default Longitude
            </label>
            <input v-model="editable.lng" class="form-control" type="text">
          </div>

          <!-- Lat -->
          <div class="mb-4 col-12">
            <label for="bio">
              Bio
            </label>
            <textarea v-model="editable.bio" rows="10" class="form-control h-100"></textarea>
          </div>
          <button class="btn btn-success py-3">save changes <i class="mdi mdi-check"></i></button>

        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const editable = ref({})
    const router = useRouter()

    watchEffect(() => {
      logger.log('watcherEffect ran', editable.value)
      AppState.account
      editable.value = AppState.account
    })

    return {
      editable,
      account: computed(() => AppState.account),

      async editProfile() {
        try {
          logger.log('edited info', editable.value)
          await accountService.editProfile(editable.value)
          Pop.success('Profile updated!')
          router.push({ name: 'Account', params: { profileId: AppState.account.id } })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
