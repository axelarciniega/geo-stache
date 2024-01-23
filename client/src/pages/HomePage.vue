<template>
  <section class="container txt-DrkGreen">

    <section class="txt-DrkGreen row justify-md-content-around justify-content-center my-3">
      <div class="col-md-5 col-4 order-md-0 order-1">
        <img id="v-step-0" class="logo v-step-1" src="../assets/img/Geo-Stache-logo.png" alt="">
      </div>
      <!-- STUB Map Card -->
      <div class="col-md-7 col-12 position-relative p-0 my-md-0 my-2 map-link order-md-1 order-0">
        <router-link :to="{ name: 'Map' }">

          <MapCard id="v-step-3" />
          <div class="frosted-card">
            <h1 class="ps-2 position-relative txt-DrkGreen text-center">Open Map</h1>
          </div>
        </router-link>
      </div>
    </section>


    <div class="container">

      <section class="row justify-content-between my-3">


        <!-- Other slide captions

  "Explore the Unknown"
  "Embark on a Journey of Discovery"
  "Connect with Nature"
  "Discover Serenity in the Great Outdoors"
  "Adventure Awaits You"
  Call to Action: "Start Your Adventure"
  Call to Action: "Join the Wilderness"
  Call to Action: "Begin Your Quest" -->

        <!-- STUB KEEP CAROUSEL -->
        <div id="geo-carousel" class="carousel slide col-md-6 col-12 rounded-carousel" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#geo-carousel" data-bs-slide-to="0" class="active" aria-current="true"
              aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#geo-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#geo-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100 rounded-carousel"
                src="https://www.bing.com/th/id/OGC.b8b48ca78b046c2ef8d86e4331484cd9?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f175784%2fscreenshots%2f1558322%2fcompass-motion.gif&ehk=OHxQSiXHBGTXWCS6jvuFfidTkpfs1EqIz7uflZlQF%2bw%3d"
                alt="First slide">
              <div class="carousel-caption d-none d-md-block fw-bold readability">
                <h5>Discover,<br>Your Endless Adventures Awaits!</h5>
                <p>Start Exploring Now</p>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 rounded-carousel" src="https://media.giphy.com/media/dAROL6nqJMaiX4QS0c/giphy.gif"
                alt="Second slide">
              <div class="carousel-caption d-none d-md-block fw-bold readability">
                <h5>Join Our Community Today!</h5>
                <p>Sign Up and Dive In</p>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 rounded-carousel"
                src="https://bloximages.chicago2.vip.townnews.com/idahopress.com/content/tncms/assets/v3/editorial/0/11/01111a62-557d-11ed-a72d-63ea1477b2c2/6359b3b187ec9.image.jpg?resize=742%2C500"
                alt="Third slide">
              <div class="carousel-caption d-none d-md-block fw-bold readability">
                <h5>Uncover Hidden Gems Around You!</h5>
                <p>Get Started - It's Free!</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#geo-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#geo-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>


        <!-- STUB Stache Template -->
        <div id="v-step-2" class="col-md-5 col-12 glass-card my-md-0 my-2">
          <table class="row">
            <tr class="col-12 justify-content-between d-flex">
              <th class="col-4 text-center px-1">Stache Name</th>
              <th class="col-4 text-center px-1">Creator Name</th>
              <th class="col-4 text-center px-1">difficulty</th>
            </tr>

            <div v-for="s in staches" :key="s.id">
              <StacheCard :stache="s" />
            </div>
            <section class="row justify-content-around my-2">
              <button @click="ChangePage(previousUrl)" :disabled="!previousUrl" class="col-5 bgNew rounded search">
                <i class="mdi mdi-arrow-left"></i> Recent
              </button>
              <button @click="ChangePage(nextUrl)" :disabled="!nextUrl" class="col-5 bgNew rounded search">
                Vintage <i class="mdi mdi-arrow-right"></i>
              </button>
            </section>
          </table>
        </div>
      </section>
    </div>

  </section>
  <Tour v-if="account.needsTour" :steps="steps" :myCallbacks="geoTourCallbacks" />
</template>
<script>
import { computed, onMounted } from 'vue'
import Pop from '../utils/Pop'
import { stachesService } from '../services/StachesService'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';


export default {
  setup() {
    onMounted(() => {
      getStaches()
    })
    const router = useRouter()
    async function getStaches() {
      try {
        await stachesService.getStaches()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),
      staches: computed(() => AppState.staches),
      pageNumber: computed(() => AppState.PageNumber),
      totalPages: computed(() => AppState.TotalPages),
      nextUrl: computed(() => AppState.nextUrl),
      previousUrl: computed(() => AppState.previousUrl),

      steps: [{
        target: '#v-step-0',
        header: { title: `Welcome to GeoStache!` },
        content: `We are so glad to have you here! Let's start with a tour...`,
        params: { placement: 'bottom' }
      },
      {
        target: '.v-step-1',
        // header: { title: `Is location enabled on your device?` },
        content: `There are a couple options for where to begin.`,
        params: { placement: 'bottom' }
      },
      {
        target: '#v-step-2',
        header: { title: `Recent Staches` },
        content: `Go directly to a recently placed Stache, or...`,
      },
      {
        target: '#v-step-3',
        header: { title: `The Map` },
        content: `Look at all the Staches by location. Have a look at nearby Staches!`,
      },
      ],

      geoTourCallbacks: {
        onFinish: (() => {
          router.push({ name: 'Map' })
          if (AppState.account.needsTour == true) {
            return AppState.account.needsTour = false
          }
        }),
        onSkip: (async () => {
          await accountService.editAccount({ needsTour: false })
        })
      },

      async ChangePage(url) {
        try {
          logger.log('changing page', url)
          await stachesService.ChangePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }

}
</script>


<style scoped lang="scss">
.rounded-carousel {
  -moz-border-radius: 10px;
  /* FF1+ */
  -webkit-border-radius: 10px;
  /* Saf3-4, iOS 1+, Android 1.5+ */
  border-radius: 10px;
  /* Opera 10.5, IE9, Saf5, Chrome, FF4 */
  overflow: hidden;
  z-index: 1000;
}


.stacheList {
  border: 3px solid var(--UltraDrkGreen);
  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
  border-radius: 16px
}

.readability {
  text-shadow: 1px 1px 2px black;
}


// show up on this size and smaller
@media screen and (max-width: 768px) {
  .logo {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .map-link {
    img {
      width: 100%;
      height: 30vh !important;
      object-fit: cover;
      object-position: center;
      border-radius: 10px !important;
    }

    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
  }

  .map-link:hover {
    transform: scale(1) !important;
    transition: ease .35s;
    filter: brightness(1.2);
  }
}

div.map-link {
  border-radius: 10px;
}

.logo {
  max-width: 100%;
  // filter:drop-shadow (0 0 0.75rem crimson)
  filter: drop-shadow(3px 8px 7px #292828);
}

.map-link {
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }

  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
  0 5px 6px 0 rgba(43, 43, 43, 0.79),
  0 1px 8px 0 rgba(43, 43, 43, 0.79);
}

.map-link:hover {
  border-radius: 10px;
  transform: scale(1.03);
  transition: ease .35s;
  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
  // box-shadow: 0 0 10px 3px rgba(205, 205, 205, 0.85),
  //   inset 0 0 5px 5px rgba(205, 205, 205, 1);
  // 0 5px 6px 0 rgba(205, 205, 205, 0.79)
  overflow-x: clip;
}

.frosted-card {
  backdrop-filter: blur(5px);
  background-color: rgba(219, 220, 221, 0.592);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  top: 0;
  position: absolute;
  width: 100%;
  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
}

// .frosted-card:hover{
//   backdrop-filter: blur(5px);
//     background-color: rgba(219, 220, 221, 0.592);
//     border-top-left-radius: 5px;
//     border-top-right-radius: 5px;
//     top: 0;
//     position: absolute;
//     width: 100%;
//     transform: scale(1.03);
// transition: ease .35s;
// }
.homepage-pic {
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
    0 5px 6px 0 rgba(43, 43, 43, 0.79),
    0 1px 8px 0 rgba(43, 43, 43, 0.79);
}

.glass-card {
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(245, 245, 245, 0.432);
}

// .container,
// .container-fluid {
//   outline: 2px double blue;
//   outline-offset: -2px;
// }

// .row {
//   outline: 2px dashed red;
//   outline-offset: -2px;
// }

// [class*="col-"] {
//   outline: 2px dotted forestgreen;
//   outline-offset: -3px;
// }

button.create {
  background-color: #FE9030;
}

button.create:hover {
  background-color: rgb(254, 144, 48);
  box-shadow: 0 0 10px 2px rgb(254, 144, 48);
}

//       img {
//   // Uncomment after change text color
//   background-image: url(/assets/img/Geo-Stache-logo.png);
//   object-fit: contain;
//   object-position: center;
//   max-height: 800px;
// }
</style>