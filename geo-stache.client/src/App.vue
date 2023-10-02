<template>
  <body class="bg-img fnt-Cabin txt-DrkGreen">

    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>

    <!-- NOTE FOOTER -->

    <!-- <<<<<<< HEAD -->
    <!-- <footer class="bg-dark text-light"> -->
    <!-- Made with 🥸 by Geo-Stache -->
    <!-- ======= -->

    <footer class="text-light sticky-bottom"><span>
        <!-- <img class="footer-bg" src="./assets/img/TheStache.png" alt=""> -->

        <img :src="DrkGreenStacheImage" alt="Geo-Stache Logo" class="stache text-center">

      </span>
      <!-- >>>>>>> 025bd5e36a7da95156e582bff058305b343cee8b -->
    </footer>

  </body>
</template>

<script>
import DrkGreenStacheImage from './assets/img/STACHE-DrkGreen.png'
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      DrkGreenStacheImage,
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg-img {
  // ✅DONE: Uncomment after change text color
  // background-image: url(https://images.unsplash.com/photo-1554755229-ca4470e07232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80);
  // background-image: url("https://images.unsplash.com/photo-1520299607509-dcd935f9a839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80");
  // background-image: url("./assets/img/bg-map-75.png");
  // background-image: url("./assets/img/bg-map-60.png");
  // background-image: url("./assets/img/bg-map-50.png");
  // background-image: url("./assets/img/bg-map-40.png");
  background-image: url("./assets/img/bg-map-30.png");
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
  // max-height: 32px !important;
  max-height: 5vh;
  filter: drop-shadow(0 0 2px #F2E3DB);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: #41644A;
}

.footer-bg {
  max-height: 5vh;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255));
}
</style>
