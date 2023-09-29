<template>
<<<<<<< HEAD
  <nav class="navbar navbar-expand-lg navbar-dark background-nav px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="logo" src="../assets/img/GeoStache.png" alt="">
=======
  <nav class="navbar navbar-expand-lg navbar-dark bg-Green px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/Geo-Stache-Logo.png" height="45" />
>>>>>>> 4602bb3a23f66ef5d5e7ac6af8ee8b0e463fa03b
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Nav Map' }" class="btn text-success lighten-30 selectable text-uppercase">
            Map
          </router-link> -->
        </li>
        <li>
          <router-link :to="{ name: 'Stache Details' }" class="btn text-success lighten-30 selectable text-uppercase">
            StacheDetailsPage
          </router-link>
        </li>
        <li>
          <!-- <router-link :to="{ name: 'Location' }" class="btn text-success lighten-30 selectable text-uppercase">
            Location
          </router-link> -->
        </li>
      </ul>
      <!-- MODAL WRAPPER -->
      <div class="collapse navbar-collapse p-2 rounded " id="navbarText">
        <ul class="navbar-nav me-auto">
          <ModalWrapper id="id">
            <!--FIXME add back in when ready -  v-if="user.isAuthenticated" -->
            <template #button>
              <i class="mdi mdi-plus-box"></i> Create Stache
            </template>

            <template #body>
              <CreateStacheForm />
            </template>
          </ModalWrapper>
        </ul>

      </div>
      <!-- LOGIN COMPONENT HERE -->
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
.logo {
  height: 70px;
  width: 70px;
  filter: drop-shadow (0 0 0.75rem crimson);
  filter: drop-shadow(3px 8px 7px #292828);
}

.background-nav {
  background: linear-gradient(45deg, #41644A, #7da386);
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>