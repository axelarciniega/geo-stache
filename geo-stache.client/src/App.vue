<template>
  <body class="bg-img fnt-Cabin">

    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer class="text-light"><span>

        <img :src="orangeStacheImage" alt="Geo-Stache Logo" class="stache text-center">

      </span>
    </footer>

  </body>
</template>

<script>
import orangeStacheImage from './assets/img/orange-stache.png'
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      orangeStacheImage,
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg-img {
  // FIXME Uncomment after change text color
  // background-image: url(https://images.unsplash.com/photo-1554755229-ca4470e07232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80);
  background-image: url("https://images.unsplash.com/photo-1520299607509-dcd935f9a839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80");
  // background-image: url("./assets/img/Geo-Stache-bg-Copy.png");
  object-position: right;
  object-fit: cover;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.stache {
  max-height: 27px !important;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: #41644A;
}
</style>
