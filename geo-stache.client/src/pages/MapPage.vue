<template>
  <div class="container">
    <section class="row justify-content-center">
      <div>
        <h1>
          TEST
        </h1>
      </div>
      <!-- <div class="col-6 bg-primary">
qwerty
    </div> -->
      <div class="col-6 bg-danger">
        <form action class="row">
          <!-- maxLength = Mick-proof this -->
          <input type="text" placeholder="address" v-model="address" class="col-10">
          <i @click="locateButtonPressed()" class="col-1 mdi mdi-map-marker-outline"></i>
        </form>
      </div>
    </section>
    <!-- THIS IS CAUSING PAGE FREEZE: position absolute issue -->
    <!-- <section id="map">
    </section> -->
  </div>
</template>
<!-- video # 7 has error spin wheel rendering -->
<!-- video # 9 position absolute/relative -->
<script>
import axios from 'axios';
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
export default {
  data() {
    return {
      address: ""
    }
  },
  // onMounted() {
  //   this.locateButtonPressed()
  // },
  setup() {
    return {
      async locateButtonPressed() {
        if (navigator.geolocation) {
          const permissions = await navigator.permissions.query({ name: 'geolocation' })
          if (permissions.state == 'denied') {
            return console.warn('invalid permissions')
          }
          navigator.geolocation.getCurrentPosition(
            position => {
              this.getAddressFrom(position.coords.latitude, position.coords.longitude)
              logger.log(position.coords.latitude);
              logger.log(position.coords.longitude);
              this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude)
            },
            error => {
              logger.log(error)
            },
          );
        } else {
          logger.log("Your browser does not support the geolocation API")
        }
      },
      async getAddressFrom(lat, long) {
        //  yourkey: AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg
        // make AXIOS reference top of page || Mick's spellbook lecture
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg").then(response => {
          if (response.data.error_message) {
            logger.log(response.data.error_message)
          } else {
            this.address = response.data.results[0].formatted_address
            // [0] most precise input based on long/lat address, goes to general Idaho, USA
            logger.log(response.data.results[0].formatted_address);
          }
        });
      },
      // NOT WORKING :arrow_down:
      showUserLocationOnTheMap(latitude, longitude) {
        // axios.google and just google both rooted in problem of being undefined
        let map = new axios.google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: new axios.google.maps.LatLng(latitude, longitude),
          mapTypeId: axios.google.maps.MapTypeId.ROADMAP
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  background-color: chocolate;
  color: whitesmoke;
}
#map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: red;
}
</style>