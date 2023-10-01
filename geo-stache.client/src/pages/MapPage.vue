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
    <div class="border border-5 rounded m-2 border-black m-2 elevation-5" id="map" style="width: 100%; height: 250px;">
    </div>

    <!-- List of added staches (markers) with clickable links and distance -->
    <div class="col-8 border border-3 border-black bg-light fw-bold text-dark">
      <h3>Added Staches:</h3>
      <ul>
        <li v-for="(stache, index) in sortedStaches" :key="index">
          <a href="#" @click="centerMapOnStache(stache)">
            {{ stache.lat }} {{ stache.lng }}
          </a>
          <span v-if="userLocationMarker">
            Distance: {{ calculateDistance(userLocationMarker, stache).toFixed(2) }} miles
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { stachesService } from '../services/StachesService.js';
import Pop from '../utils/Pop.js';
Pop
export default {
  data() {
    return {
      stache: computed(() => AppState.staches),
      map: null,
      searchQuery: '', // User's search query
      searchService: null, // Google Places Autocomplete service
      isSettingStache: false, // Flag to indicate if setting a stache (marker) is active
      userLocationMarker: null, // Marker for the user's location
      infoWindows: [], // Store InfoWindow instances
    };
  },
  computed: {
    sortedStaches() {
      if (this.userLocationMarker) {
        // Sort staches (markers) by distance from user
        return [...AppState.staches].sort((a, b) => {
          const distanceA = this.calculateDistance(this.userLocationMarker, a);
          const distanceB = this.calculateDistance(this.userLocationMarker, b);
          return distanceA - distanceB;
        });
      } else {
        // If user location is not available, return staches (markers) as is
        return AppState.staches;
      }
    },

    userLocationInfo() {
      if (this.userLocationMarker) {
        return {
          lat: this.userLocationMarker.getPosition().lat(),
          lng: this.userLocationMarker.getPosition().lng(),
        };
      }
      return { lat: 0, lng: 0 }; // Default values if user location marker is not available.
    },
  },



  methods: {
    calculateDistance(stache1, stache2) {
      const lat1 = stache1.getPosition().lat();
      const lng1 = stache1.getPosition().lng();
      const lat2 = stache2.getPosition().lat();
      const lng2 = stache2.getPosition().lng();

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
      return dist;
    },
    async getStaches() {
      try {
        await stachesService.getStaches()
      } catch (error) {
        Pop.error(error)
      }

    },

    getUserLocationAndDisplayMap() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 12,
          });

          this.userLocationMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: this.map,
            title: 'User',
          });

          AppState.staches.forEach(stache => {
            logger.log(this.map)
            new google.maps.Marker({
              position: { lat: stache.lat, lng: stache.lng },
              map: this.map,
              title: `${stache.stacheName}`,

            })

          });

        });
      } else {
        alert('Geolocation is not available in your browser');
      }
    },

    searchLocation() {
      if (this.searchQuery && this.map) {
        if (!this.searchService) {
          this.searchService = new google.maps.places.AutocompleteService();
        }

        this.searchService.getPlacePredictions(
          {
            input: this.searchQuery,
            componentRestrictions: { country: 'US' },
          },
          (predictions) => {
            if (predictions && predictions.length > 0) {
              const place = predictions[0];
              const placeService = new google.maps.places.PlacesService(this.map);
              placeService.getDetails(
                { placeId: place.place_id },
                (result, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
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


    centerMapOnStache(stache) {
      this.map.setCenter(stache.getPosition());
    },

    createInfoWindow(stache) {
      const marker = new google.maps.Marker({
        position: stache.getPosition(), // Use the stache's position
        map: this.map,
        title: stache.title,
      })

      const infowindow = new google.maps.InfoWindow({
        content: stache.title,
      })

      this.infoWindows.push(infowindow);

      google.maps.event.addListener(marker, 'click', () => {
        this.openInfoWindow(marker, infowindow);
      })

      return { marker, infowindow };
    },


    openInfoWindow(stache, infowindow) {
      this.infoWindows.forEach((iw) => iw.close());
      infowindow.open(this.map, stache);
    },
  },


  watch: {
    map(newValue) {
      if (newValue) {
        google.maps.event.addListener(newValue, 'click', (event) => {
          if (!this.isSettingStache) {
            if (confirm('Do you want to set a new stache (marker)?')) {
              const stache = new google.maps.Marker({
                position: event.latLng,
                map: this.map,
                title: 'New Stache',
              });

              this.createInfoWindow(stache);
              AppState.staches.push(stache);
              this.isSettingStache = false;
            }
          }
        });
      }
    },
  },
  mounted() {
    if (typeof google !== 'undefined') {
      this.getUserLocationAndDisplayMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&libraries=places`;
      script.onload = this.getUserLocationAndDisplayMap;
      document.head.appendChild(script);
    }

    this.getStaches().then(() => {
      // Iterate through the staches and create markers for each
      AppState.staches.forEach((stache) => {
        const marker = new google.maps.Marker({
          position: {
            lat: stache.lng, // Use lat property from stacheLocation
            lng: stache.lat, // Use lng property from stacheLocation
          },
          map: this.map,
          title: stache.stacheName, // Use stacheName property as the marker's title
        });
        return marker

        // You can add more customization or event listeners to the marker if needed

        // Store the marker reference if you want to access it later
        // For example, you can push them into an array.
        // this.markers.push(marker);
      })
    })
  },


};
</script>

<style scoped lang="scss"></style>
