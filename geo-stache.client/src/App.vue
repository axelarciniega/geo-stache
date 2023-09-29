<template>
  <body class="bg-img fnt-Cabin">

    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <<<<<<< HEAD <!-- NOTE FOOTER -->
      =======
      <<<<<<< HEAD <footer class="bg-dark text-light">
        <!-- Made with 🥸 by Geo-Stache -->
        <img class="footer-bg" src="./assets/img/TheStache.png" alt="">
        =======
        >>>>>>> 00811adc015d62c3f6b89e1ba8f4e01236587f9f
        <footer class="text-light"><span>

            <img :src="blackStacheImage" alt="Geo-Stache Logo" class="stache text-center">

          </span>
          >>>>>>> 025bd5e36a7da95156e582bff058305b343cee8b
        </footer>

  </body>
</template>

<script>
import blackStacheImage from './assets/img/STACHE.png'
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      blackStacheImage,
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
  // background-image: url("https://images.unsplash.com/photo-1520299607509-dcd935f9a839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80");
  // background-image: url("./assets/img/bg-map-75.png");
  // background-image: url("./assets/img/bg-map-60.png");
  // background-image: url("./assets/img/bg-map-50.png");
  background-image: url("./assets/img/bg-map-40.png");
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
  max-height: 29px !important;
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
