<template>
  <nav class="navbar navbar-expand-lg navbar-dark background-nav px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="logo" src="../assets/img/GeoStache.png" alt="">
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
          <router-link :to="{ name: 'Map' }" class="btn text-success lighten-30 selectable text-uppercase">
            Map
          </router-link>
        </li>
        <li>
          <!-- <router-link :to="{ name: 'Location' }" class="btn text-success lighten-30 selectable text-uppercase">
            Location
          </router-link> -->
        </li>
      </ul>
      <!-- MODAL WRAPPER -->
      <ul class="navbar-nav me-auto">
        <ModalWrapper id="create-event" v-if="user.isAuthenticated">
          <template #button>
            <i class="mdi mdi-plus-box"></i> Create Stache
          </template>

          <template #body>
            <EventForm />
          </template>
        </ModalWrapper>
      </ul>


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


export default {
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  },
  components: { Login, ModalWrapper }
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