<template>
  <nav class="txt-LghtSand fw-semibold fs-5 navbar navbar-expand-lg bg-Green px-3">
    <router-link class="navbar-brand d-flex txt-LghtSand" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center txt-LghtSand">
        <img alt="logo" src="../assets/img/Geo-Stache-logo.png" height="55" />

      </div>
    </router-link>
    <img alt="logo" src="../assets/img/NewGeoLogo.png" height="50" width="200" />
    <button class="navbar-toggler txt-LghtSand" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon txt-Sand"></span>
    </button>
    <div class="collapse navbar-collapse txt-Sand
    " id="navbarText">
      <ul class="navbar-nav me-auto txt-Sand">
        <li title="Click here to search for Staches on the Map">
          <router-link :to="{ name: 'Map' }"
            class="readability btn fw-bold txt-LghtSand lighten-30 selectable text-uppercase">
            Map
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'FAQ' }"
            class="readability btn fw-bold txt-LghtSand lighten-30 selectable text-uppercase">
            FAQ
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'About' }"
            class="readability btn fw-bold txt-LghtSand lighten-30 selectable text-uppercase">
            About Us
          </router-link>
        </li>

      </ul>
      <!-- STUB MODAL WRAPPER -->
      <div v-if="user.isAuthenticated" class=" p-2 rounded txt-Sand" id="navbarText">
        <ul class="navbar-nav me-auto txt-Sand">
          <ModalWrapper id="id">

            <template #button>
              <i class="mdi mdi-plus-box readability pe-1"></i>
              <p style="display:inline" class="readability">Create Stache</p>
            </template>
            <template #body>
              <CreateStacheForm />
            </template>
          </ModalWrapper>
        </ul>

      </div>


      <div class="collapse navbar-collapse p-2 rounded txt-Sand text-end" id="navbarText" v-else>


        <button disabled class="btn txt-Sand text-end">login to create stache</button>
      </div>
      <!-- STUB LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>

import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Login from './Login.vue';
import ModalWrapper from './ModalWrapper.vue';
import CreateStacheForm from './CreateStacheForm.vue';



export default {
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  },
  components: { Login, ModalWrapper, CreateStacheForm }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--Sand);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>