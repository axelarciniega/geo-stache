<template>
  <div class=" container-fluid">
    <div class="d-flex justify-content-center">
      <div>
        <!-- <button class="btn btn-warning border border-3 border-dark m-1 elevation-5"
          @click="getUserLocationAndDisplayMap">Show
          Map</button> -->
      </div>
      <div>
        <input class="border border-3 border-dark m-1 elevation-5" type="text" v-model="searchQuery"
          placeholder="Search for a location" />
        <button class="btn btn-warning border border-3 border-dark m-1 elevation-5"
          @click="searchLocation">Search</button>
      </div>
    </div>
    <div class="border border-5  rounded m-2 border-black m-2 elevation-5" id="map" style="width: 100%; height: 250px;">
    </div>
    <!-- List of added markers with clickable links and distance -->
    <div class="col-8 border border-3 border-black bg-light fw-bold text-dark">
      <h3>Added Markers:</h3>

      <ul>
        <li v-for="(marker, index) in sortedMarkers" :key="index">
          <!--MAKE A COMPONET HERE FOR THE MARKERS-->
          <a href="#" @click="centerMapOnMarker(marker)">
            {{ marker.title }}
          </a>
          <span v-if="userLocationMarker">
            Distance: {{ calculateDistance(userLocationMarker, marker).toFixed(2) }} miles
          </span>
          <!-- <span :style="{ color: isUser(marker) ? 'black' : 'black' }">
            <span v-if="isUser(marker)">
              (user)
            </span>
          </span> -->
          <span :style="{ color: isWithin3Miles(marker) ? 'lawnGreen' : 'black' }">
            <span v-if="isWithin3Miles(marker)">
              (Within 3 miles)
            </span>
          </span>
          <span :style="{ color: isWithin6Miles(marker) ? 'darkGreen' : 'black' }">
            <span v-if="isWithin6Miles(marker)">
              (within 6 miles)
            </span>
          </span>
          <span :style="{ color: isWithin10Miles(marker) ? 'teal' : 'black' }">
            <span v-if="isWithin10Miles(marker)">
              (within 10 miles)
            </span>
          </span>
          <span :style="{ color: isWithin20Miles(marker) ? 'blue' : 'black' }">
            <span v-if="isWithin20Miles(marker)">
              (within 20 miles)
            </span>
          </span>
          <span :style="{ color: isWithin50Miles(marker) ? 'purple' : 'black' }">
            <span v-if="isWithin50Miles(marker)">
              (within 50 miles)
            </span>
          </span>
          <span :style="{ color: isWithin100Miles(marker) ? 'orange' : 'black' }">
            <span v-if="isWithin100Miles(marker)">
              (within 100 miles)
            </span>
          </span>
          <span :style="{ color: fartherThan100Miles(marker) ? 'red' : 'red' }">
            <span v-if="fartherThan100Miles(marker)">
              (more than 100 miles)
            </span>
          </span>
          <!--MAKE COMPONET MARKER HERE-->
        </li>
      </ul>
    </div>
  </div>
  <div v-for="stache in staches" :key="stache.id">

    {{ stache.lat }}
    {{ stache.lng }}
  </div>
</template>

<script>
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';


export default {
  data() {
    //NOTE these are all of our mock arrays for testing.
    return {
      map: null,
      markers: [], //NOTE To store markers added to the map
      searchQuery: '', //NOTE User's search query
      searchService: null, //NOTE Google Places Autocomplete service
      isSettingMarker: false, //NOTE Flag to indicate if setting a marker is active
      pendingMarkerLocation: null, //NOTE Location selected for pending marker
      userLocationMarker: null, //NOTE Marker for the user's location
      infoWindows: [], //NOTE Store InfoWindow instances
      staches: computed(() => AppState.staches),

    };
  },
  //NOTE this is the equation for calculating the distance from each marker in our mock markers array and
  //NOTE calculates the distance from the user marker location to the stache location.
  //NOTE and then sorts the distance from the user.

  computed: {
    sortedMarkers() {
      if (this.userLocationMarker) {
        // Sort markers by distance from user
        return [...this.markers].sort((a, b) => {
          const distanceA = this.calculateDistance(this.userLocationMarker, a);
          const distanceB = this.calculateDistance(this.userLocationMarker, b);
          return distanceA - distanceB;
        });
      } else {
        // If user location is not available, return markers as is
        return this.markers;
      }
    },
  },
  methods: {
    calculateDistance(marker1, marker2) {
      const lat1 = marker1.getPosition().lat();
      const lng1 = marker1.getPosition().lng();
      const lat2 = marker2.getPosition().lat();
      const lng2 = marker2.getPosition().lng();

      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const radlon1 = (Math.PI * lng1) / 180;
      const radlon2 = (Math.PI * lng2) / 180;
      const theta = lng1 - lng2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      // logger.log("this is the calculated distance", dist)
      return dist;
    },
    //NOTE in this functin we are createing a marker for the user as soon as 
    //NOTE the page is mounted and then adds them to our mock marker array
    getUserLocationAndDisplayMap() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 12,
          });
          logger.log('this is the mapping function', this.map)

          this.userLocationMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: this.map,
            title: 'User',

          });


          this.markers.push(this.userLocationMarker);
          logger.log("sending the location", this.userLocationMarker)
          logger.log("the long, and latt", longitude, latitude)
        });
      } else {
        alert('Geolocation is not available in your browser');
      }
    },

    searchLocation() {
      if (this.searchQuery && this.map) {
        //NOTE this is a check befor we Create a Places Autocomplete service
        if (!this.searchService) {
          this.searchService = new google.maps.places.AutocompleteService();
        }

        //NOTE  this is to Perform the autocomplete search, we could even restrict it to be more loccaly scoped.
        this.searchService.getPlacePredictions(
          {
            input: this.searchQuery,
            componentRestrictions: { country: 'US' },
          },
          (predictions) => {
            if (predictions && predictions.length > 0) {
              const place = predictions[0];

              // Get detailed information about the selected place
              const placeService = new google.maps.places.PlacesService(this.map);
              placeService.getDetails(
                { placeId: place.place_id },
                (result, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Center the map on the selected place
                    this.map.setCenter(result.geometry.location);
                  }
                }
              );
            }
          }
        );
      } else {
        alert('Map not initialized or search query is empty.');
      }
    },

    centerMapOnMarker(marker) {
      // NOTE this centers the user on the clicked part of the map.
      this.map.setCenter(marker.getPosition());
    },


    isWithin3Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance <= 3 && distance > 0.000005;
      }
      return false;
    },
    isWithin6Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance >= 3 && distance <= 6;
      }
      return false;
    },
    isWithin10Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance >= 6 && distance <= 10;
      }
      return false;
    },
    isWithin20Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance >= 10 && distance <= 20;
      }
      return false;
    },
    isWithin50Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance >= 20 && distance <= 50;
      }
      return false;
    },
    isWithin100Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance >= 50 && distance <= 100;
      }
      return false;
    },
    fartherThan100Miles(marker) {
      if (this.userLocationMarker) {
        const distance = this.calculateDistance(this.userLocationMarker, marker);
        //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
        return distance > 100;
      }
      return false;
    },

    createInfoWindow(marker) {
      const infowindow = new google.maps.InfoWindow({
        content: marker.title,
      });

      this.infoWindows.push(infowindow);

      google.maps.event.addListener(marker, 'click', () => {
        this.openInfoWindow(marker, infowindow);
      });

      return infowindow;
    },

    openInfoWindow(marker, infowindow) {
      this.infoWindows.forEach((iw) => iw.close());
      infowindow.open(this.map, marker);
    },
  },


  //NOTE - this is creating a new marker at the clisked location, it also is promting the user to confirm that they want to set a marker
  //NOTE - we added an event listener to the map for setting markers, so when a marker is set it is disabled until the 
  //NOTE - clicks and confirms to set another marker, it then pushes the marker the out fake array we have set up
  //NOTE - and then creates an info window on the map


  watch: {
    map(newValue) {
      if (newValue) {

        google.maps.event.addListener(newValue, 'click', (event) => {
          if (!this.isSettingMarker) {

            if (confirm('Do you want to set new Geo-Stache marker?')) {

              const marker = new google.maps.Marker({
                position: event.latLng,
                map: this.map,
                title: 'Geo-Stache',
              });
              logger.log("newMaker Coordinates", marker.position)
              this.createInfoWindow(marker);

              this.markers.push(marker);
              logger.log(marker);

              this.isSettingMarker = false;
            }
          }
        });
      }
    },
  },
  //NOTE - this should make sure we are getting a response from the api

  mounted() {
    if (typeof google !== 'undefined') {
      this.getUserLocationAndDisplayMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&libraries=places`;
      script.onload = this.getUserLocationAndDisplayMap;
      document.head.appendChild(script);
    }
  },
};
</script>

<style scoped lang="scss"></style>
