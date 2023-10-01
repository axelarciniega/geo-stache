<template>
  <nav class="txt-Sand navbar navbar-expand-lg bg-Green px-3">
    <router-link class="navbar-brand d-flex txt-Sand" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center txt-Sand">
        <img alt="logo" src="../assets/img/Geo-Stache-Logo.png" height="55" />

      </div>
    </router-link>
    <button class="navbar-toggler txt-Sand" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon txt-Sand"></span>
    </button>
    <div class="collapse navbar-collapse txt-Sand
    " id="navbarText">
      <ul class="navbar-nav me-auto txt-Sand">
        <li title="Click here to search for Staches on the Map">
          <router-link :to="{ name: 'Nav Map' }" class="btn txt-Sand lighten-30 selectable text-uppercase">
            Map
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'FAQ' }" class="btn txt-Sand lighten-30 selectable text-uppercase">
            FAQ
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'About' }" class="btn txt-Sand lighten-30 selectable text-uppercase">
            About Us
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'Stache Details' }" class="btn text-success lighten-30 selectable text-uppercase">
            StacheDetailsPage
          </router-link>
        </li> -->
      </ul>
      <!-- MODAL WRAPPER -->
      <div v-if="user.isAuthenticated" class=" p-2 rounded txt-Sand" id="navbarText">
        <ul class="navbar-nav me-auto txt-Sand">
          <ModalWrapper id="id">
            <!-- ✅DONE add back in when ready -  v-if="user.isAuthenticated" -->
            <template #button>
              <i class="mdi mdi-plus-box"></i> Create Stache
            </template>
            <template #body>
              <CreateStacheForm />
            </template>
          </ModalWrapper>
        </ul>

      </div>
      <div class="collapse navbar-collapse p-2 rounded txt-Sand text-end" id="navbarText" v-else>
        <!-- <button data-balloon-length="medium" aria-label="Join us in and start your Stache Adventures!"
          data-balloon-pos="up">Join us in and start your Stache Adventures!"</button> -->

        <button disabled class="btn txt-Sand text-end">login to create stache</button>
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
/* .logo {
  height: 70px;
  width: 70px;
  filter: drop-shadow (0 0 0.75rem crimson);
  filter: drop-shadow(3px 8px 7px #292828);
} */

/* .background-nav {
  background: linear-gradient(45deg, #41644A, #7da386);
} */

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

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>