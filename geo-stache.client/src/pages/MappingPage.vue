<template>
    <div class="d-flex justify-content-center">
        <div>
            <input class="fw-bold map_card" type="text" v-model="searchQuery" placeholder="Search for a location" />
            <button class="map_card bg-warning m-1 fw-bold" @click="searchLocation">Search</button>
        </div>
    </div>
    <div class="offset-1">

        <div class="map_card" id="map" style="width: 90%; height: 70vh;"></div>
    </div>
    <div class="glassCard  col-12 col-md-6 my-1">
        <h1 class="m-1 border border-3 border-dark rounded bg-warning fw-bold text-black text-center">STACHES</h1>
        <li v-for="(stache, index) in stache" :key="index">
            <span class=" fw-bold fs-3 text-black text-center"> {{ stache.stacheName }} - <span class="text-info"> {{
                stache.distance }} miles</span>
            </span>
        </li>
    </div>
</template>
  
<script>
import { computed } from 'vue';
import { stachesService } from '../services/StachesService.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';

export default {
    data() {
        return {
            searchQuery: '', // Store the user's search query
            searchResults: [],
            stache: computed(() => AppState.staches),
            map: null,
        };
    },
    methods: {
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 3958.8; // Radius of the Earth in miles
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance.toFixed(2); // Round to 2 decimal places
        },

        getUserLocationAndDisplayMap() {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;



                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: latitude, lng: longitude },
                        zoom: 15,
                    });

                    new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: this.map,
                        title: 'Your Location',

                    });

                    AppState.staches.forEach((stache) => {
                        const distance = this.calculateDistance(
                            latitude,
                            longitude,
                            stache.lat,
                            stache.lng
                        );
                        stache.distance = distance; // Store the distance in the stache object
                        logger.log(this.map);
                        new google.maps.Marker({
                            position: { lat: stache.lat, lng: stache.lng },
                            map: this.map,
                            title: `${stache.stacheName}`,
                        });
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

        selectLocation(result) {
            // Center the map on the selected location
            const placeService = new google.maps.places.PlacesService(this.map);
            placeService.getDetails({ placeId: result.place_id }, (place) => {
                if (place && place.geometry && place.geometry.location) {
                    const location = place.geometry.location;
                    this.map.setCenter(location);
                    this.map.setZoom(15); // Adjust the zoom level as needed
                }
            });
            this.searchResults = []; // Clear search results after selecting a location
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
    },
};
</script>
  
<style scoped lang="scss">
.glassCard {

    background: #41644ace;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 3px solid rgba(241, 233, 0, 0.673);
}

.map_card {
    border: 3px solid #29412fce;
    box-shadow: 0 10px 30px #41644ace;
    border-radius: 25px
}
</style>
  