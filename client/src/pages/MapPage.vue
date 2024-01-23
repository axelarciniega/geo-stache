<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center">
      <div>
        <input class="border border-3 border-dark m-1 elevation-5" type="text" v-model="searchQuery"
          placeholder="Search for a location" />
        <button class="btn btn-warning border border-3 border-dark m-1 elevation-5"
          @click="searchLocation">Search</button>
      </div>
    </div>
    <div class="border border-5 rounded m-2 border-black m-2 elevation-5" id="map" style="width: 100%; height: 70vh;">
    </div>

    <!-- List of added staches (markers) with clickable links and distance -->

    <label for="pet-select">Select Distance:</label>

    <nav class="row justify-content-around my-3">
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = ''">All</button>
      <span style="display: inline-block; width:0px; height:100%; background:rgb(205, 205, 205); margin:0 2px"></span>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance <= 3 > 0.00005">3
        miles</button>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance <= 6">6 miles</button>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance <= 10">10 miles</button>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance <= 20">20 miles</button>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance <= 40">40 miles</button>
      <button class="glassCard2 btn col-2 btn-outline-light" @click="filterBy = stache.distance > 40.1">+ 40
        miles</button>
      <!-- <button class="btn col-2 btn-outline-light" @click="filterBy = 'misc'">Misc</button> -->
    </nav>

    <div class="m-3 ">
      <h1 class=" fw-bold text-black text-center text-decoration-underline">
        <span class="border border-3 border-dark rounded bg-warning p-2"> STACHES </span>

      </h1>
    </div>

    <div v-for="(stache, index) in stache" :key="index">
      <router-link :to="{ path: `staches/${stache.id}` }">
        <div v-if="stache.distance <= 3 > 0.00005"
          class="d-flex justify-content-between glassCard2  m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <div class="p-1">
            {{
              stache.stacheName
            }} - <span class="text-warning"> {{
  stache.distance }} miles</span>
          </div>
        </div>

        <div v-if="stache.distance >= 3.1 && stache.distance <= 6"
          class="glassCard2 d-flex justify-content-between m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <span class="">{{ stache.difficulty }}</span>
          <div class="p-1">

            {{ stache.stacheName }} -
            <span class="text-primary"> {{
              stache.distance }} miles</span>
          </div>
        </div>
        <div v-if="stache.distance >= 6.1 && stache.distance <= 10"
          class="d-flex justify-content-between glassCard2 m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <div class="p-1">
            {{
              stache.stacheName }} - <span class="text-info"> {{
    stache.distance }} miles</span>
          </div>
        </div>
        <div v-if="stache.distance >= 10.1 && stache.distance <= 20"
          class="d-flex justify-content-between glassCard2 m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <div class="p-1">
            {{
              stache.stacheName }} - <span class="text-secondary"> {{
    stache.distance }} miles</span>
          </div>
        </div>
        <div v-if="stache.distance >= 20.1 && stache.distance <= 40"
          class="d-flex justify-content-between glassCard2 m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <div class="p-1">
            {{
              stache.stacheName }} - <span class="text-danger"> {{
    stache.distance }} miles</span>
          </div>
        </div>

        <div v-if="stache.distance > 40.1"
          class="d-flex justify-content-between glassCard2 m-2 fw-bold fs-3 text-black text-center">
          <img class="favicon" src="../assets/img/favicon-32x32.png" alt="">
          <div class="p-1">
            {{
              stache.stacheName
            }} -
            <span class="text-danger"> {{
              stache.distance }} miles</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
// import { routerKey } from "vue-router";
import { useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const stache = computed(() => AppState.activeStache)
    const lat = ref(-114)
    const lng = ref(21)
    const markers = ref([])
    let map = null
    let infoWindow = null

    onMounted(() => {
      // getStacheById();
      // getCommentsByStache()
      setupMap()
      // eslint-disable-next-line no-undef
    })

    // watch(stache, () => {
    //     if (map && AppState.activeStache) {
    //         addStacheMarker()
    //     }
    // })

    function setupMap() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat.value = position.coords.latitude;
          lng.value = position.coords.longitude;
          // eslint-disable-next-line no-undef
          map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat.value, lng: lng.value },
            zoom: 15,
          });
          // eslint-disable-next-line no-undef
          infoWindow = new google.maps.InfoWindow()
          addStacheMarker()
          markYourLocation()
        })
      }
    }


    function addMarker(marker) {
      markers.value.push(marker)
      // eslint-disable-next-line no-undef
      let markerElem = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: map,
        title: marker.name || marker.title,
      });

      // eslint-disable-next-line no-undef
      google.maps.event.addListener(markerElem, 'click', () => {
        infoWindow.setContent(marker.name || marker.title);
        infoWindow.open(map, markerElem);
      })

    }

    function centerMap() {
      // eslint-disable-next-line no-undef
      const bounds = new google.maps.LatLngBounds();
      markers.value.forEach((marker) => {
        // eslint-disable-next-line no-undef
        bounds.extend(new google.maps.LatLng(marker.lat, marker.lng))
      })
      map.fitBounds(bounds)
    }

    function markYourLocation() {
      // eslint-disable-next-line no-undef
      addMarker({
        lat: lat.value,
        lng: lng.value,
        name: 'Your Location',
      })
      centerMap()
    }

    function addStacheMarker() {
      AppState.staches.forEach((stache) => {
        if (stache.value?.lat && map) {
          // eslint-disable-next-line no-undef
          addMarker({
            lat: stache.value.lat,
            lng: stache.value.lng,
            name: stache.value.stacheName
          })
        }
      })
    }

    return {
      // isMyAdventure,
      stache,
      setupMap,
      map,
      account: computed(() => AppState.account),
      stacheComments: computed(() => AppState.stacheComments),
      stacheAdventures: computed(() => AppState.activeStacheAdventures),
      myAdventures: computed(() => AppState.myAdventures),
      thisStacheAdventure: computed(() => {
        return AppState.myAdventures.find(a => a.stacheId == route.params.stacheId)
      }),

    };

  }
}
</script>
<style scoped lang="scss">
/* Your scoped CSS styles here */
</style>
