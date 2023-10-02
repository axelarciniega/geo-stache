<template class="rounded">
  <!-- Welcome -->
  <div class="container my-5">

    <section class="row justify-content-around gap-5">
      <div
        class="col-md-4 col-12 rounded elevation-1 py-3 geo-shadow d-flex flex-column align-items-center justify-content-around">
        <h3 class="py-1">Hello Adventurer!</h3>
        <h3 class="py-1">{{ account.name }}</h3>
        <img class="profile-pic geo-shadow" :src="account.picture" alt="" />
        <p class="py-3">{{ account.email }}</p>
        <!-- FIXME router link to profile page, need a get profile gy ID -->
        <!-- <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }"> -->
        <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">

          <div class="btn">
            <button class="button-class">Profile</button>
          </div>
        </router-link>
      </div>
      <div class="col-md-7 col-12 rounded elevation-1 p-2 geo-shadow">
        <MapCard />
      </div>
      <div class="col-12 elevation-1 rounded p-2 geo-shadow">
        Adventures list, aka badges
        {{ myAdventures }}
      </div>
      <!-- Bottom Section Edit Account -->
      <div class="col-12 elevation-1 rounded p-2 geo-shadow">

        <h3 class="fw-bold">Edit Your Account & Profile Details</h3>
        <h6 class="fw-bold">All but your email is editable. Your location and email area always remain private. </h6>
        <form @submit.prevent="editAccount" class="row">

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
          <div class="col-12">
            <label for="bio">
              Bio
            </label>
            <textarea v-model="editable.bio" rows="10" class="form-control h-100"></textarea>
          </div>
          <!-- Save Button -->
          <div class="m-2 col-md-3 col-12 m-0 pt-5">
            <button class="delete-button">save changes <i class="mdi mdi-check"></i></button>
          </div>

        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
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


    // NOTE put the await in the Auth0 Service
    // async function getMyAdventuredStaches() {
    //   try {

    //   } catch (error) {
    //     a
    //   }

    // }




    return {
      editable,
      profile: computed(() => AppState.profile),
      // user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      // adventures: computed(() = ApState.adventures),

      async editAccount() {
        try {
          logger.log('edited info', editable.value);
          await accountService.editAccount(editable.value);
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

<style scoped lang="scss">
.delete-button {
  background: linear-gradient(25deg, #E86A33, #e68b64);
  border-radius: 20px;
  transition: background 0.3s, transform 0.2s;
}

.delete-button:hover {
  background: linear-gradient(25deg, #e68b64, #E86A33);
  transform: translateY(-5px);
}


.button-class {
  background: linear-gradient(25deg, #41644A, #adc7b3);
  border-radius: 20px;
  transition: background 0.3s, transform 0.2s
}

.button-class:hover {
  background: linear-gradient(25deg, #adc7b3, #41644A);
  transform: translateY(-5px);
}

.divider {
  height: 3em;
}

.profile-pic {
  height: 70px;
  width: 70px;
  object-fit: cover;
  object-position: center;
  // border-radius: 50em;
}

.geo-shadow {
  backdrop-filter: blur(20px);
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
