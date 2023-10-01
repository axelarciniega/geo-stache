<template class="rounded">
  <!-- Welcome -->
  <div class="container p-2 g-4 my-3">
    <!-- v-if="user.isAuthenticated" -->
    <section class="row mt-2 justify-content-around">
      <div class="col-3 rounded elevation-1 p-2 geo-shadow">
        <h3 class="">Hello Adventurer!</h3>
        <h3 class="">{{ account.name }}</h3>
        <img class="profile-pic geo-shadow" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
        <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
          <div class="btn">
            <button>Profile</button>
          </div>
        </router-link>
      </div>
      <div class="col-7 rounded elevation-1 p-2 geo-shadow">
        <MapCard />
      </div>
      <div class="divider"></div>
      <!-- Bottom Section Edit Account -->
      <div class="elevation-1 rounded p-2 geo-shadow">

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
              Home or Preferred default Latitude
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
          <!-- Save Button -->
          <div class="m-2 col-md-3 col-12">
            <button class="btn btn-success">save changes <i class="mdi mdi-check"></i></button>
          </div>

        </form>
      </div>
    </section>
  </div>
  <!-- <div v-else> -->
  <!-- add stache as an icon -->
  <!-- <h3 class="">Hello Adventurer!</h3> -->
  <!-- <h3 class="">Log in to see your Account Details</h3> -->
  <!-- </div> -->
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { useRouter } from 'vue-router';
import MapCard from '../components/MapCard.vue';


export default {
  setup() {
    const editable = ref({});
    const router = useRouter();
    watchEffect(() => {
      logger.log('watcherEffect ran', editable.value);
      AppState.account;
      editable.value = AppState.account;
    });
    return {
      editable,
      // user: computed(() => AppState.user),
      account: computed(() => AppState.account),

      async editProfile() {
        try {
          logger.log('edited info', editable.value);
          await accountService.editProfile(editable.value);
          Pop.success('Profile updated!');
          router.push({ name: 'Account', params: { profileId: AppState.account.id } });
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { MapCard }
}
</script>

<style scoped>
.divider {
  height: 3em;
}

.profile-pic {
  height: 30px;
  width: 30px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}

.geo-shadow {
  border-radius: 10px;
  /* width: 100%; */
  /* object-fit: cover;
  object-position: center; */
  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
}

.acc-dets {
  background-color: yellow;
  padding: 20px;
  display: none;
}

img {
  max-width: 300px;
  border-radius: 25%;
}
</style>
