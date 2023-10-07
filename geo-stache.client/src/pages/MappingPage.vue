<template>
    <section class="container">

        <div class="d-flex justify-content-center my-2">
            <div>
                <input class="fw-bold map_card p-1" type="text" v-model="searchQuery" placeholder="Search for a location" />
                <button class="map_card bg-stacheGreen text-warning m-1 fw-bold" @click="searchLocation"> <span> <img
                            src="../assets/img/favicon-32x32.png" alt=""> </span> </button>
            </div>
        </div>
        <div class="d-flex justify-content-center align-content-center">

            <div class="map_card my-2" id="map" style="width: 100%; height: 70vh;"></div>
        </div>

        <!-- Not working, no logic written...also not ideal look for mobile -->


        <div class="row justify-content-center">
            <div class="glassCard col-12 col-md-7 my-1 ">
                <div class="m-3 ">

                    <h1 class=" fw-bold text-black text-center text-decoration-underline">
                        <span class="border border-3 border-dark rounded bg-warning p-2"> STACHES </span>

                    </h1>
                    <div class="my-3 offset-2">
                        <label for="distance-select">Sort by Distance:</label>
                        <select id="distance-select" v-model="selectedDistance">
                            <option value="all">All</option>
                            <!--NOTE  let's be sure to adjust the distance logic in the v-ifs below -->
                            <option value="5">Within 5 miles</option>
                            <option value="10">Within 10 miles</option>
                            <option value="20">Within 20 miles</option>
                            <option value="50">Within 50 miles</option>
                        </select>
                    </div>

                    <section class="row justify-content-around my-2">
                        <button @click="ChangePage(previousUrl)" :disabled="!previousUrl"
                            class="col-5 bg-warning rounded search border border-1 border-dark">
                            <i class="mdi mdi-arrow-left"></i> Recent
                        </button>
                        <button @click="ChangePage(nextUrl)" :disabled="!nextUrl"
                            class="col-5 bg-warning rounded search border border-1 border-dark">
                            Vintage <i class="mdi mdi-arrow-right"></i>
                        </button>
                    </section>
                </div>

                <div v-for="(stache, index) in sortedStaches" :key="index" show-pagination="false">
                    <router-link :to="{ path: `staches/${stache.id}` }">
                        <div v-if="stache.distance <= 3 && stache.distance > 0.00005"
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



        </div>

    </section>
</template>
  
<script>
import { computed } from 'vue';
import { stachesService } from '../services/StachesService.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop'


export default {
    data() {
        return {
            searchQuery: '',
            searchResults: [],
            user: computed(() => AppState.user),
            map: null,
            selectedDistance: 'all',
            pageNumber: computed(() => AppState.PageNumber),
            totalPages: computed(() => AppState.TotalPages),
            nextUrl: computed(() => AppState.nextUrl),
            previousUrl: computed(() => AppState.previousUrl),


            async ChangePage(url) {
                try {
                    logger.log('changing page', url)
                    await stachesService.ChangePage(url)
                } catch (error) {
                    Pop.error(error)
                }
            },
        };
    },


    computed: {
        sortedStaches() {
            if (this.selectedDistance === 'all') {
                // Return all staches if 'All' is selected
                return this.stache.slice().sort((a, b) => a.distance - b.distance);
            } else {
                // Filter staches by distance within the selected range
                const selectedDistance = parseFloat(this.selectedDistance);
                return this.stache
                    .filter((stache) => stache.distance <= selectedDistance)
                    .slice()
                    .sort((a, b) => a.distance - b.distance);
            }
        },
        stache() {
            return AppState.staches;
        },
    },
    methods: {
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 3958.8;
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
            return distance.toFixed(2);
        },

        getUserLocationAndDisplayMap() {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const user = AppState.user


                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: latitude, lng: longitude },
                        zoom: 12,
                    });

                    new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: this.map,
                        title: `${user.name}`,

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
                            title: `Name: ${stache.stacheName},  Info: (${stache.description})`,
                        });
                    });
                });
            } else {
                alert('Geolocation is not available in your browser');
            }
        },

        isWithin3Miles(stache) {
            if (this.userLocationMarker) {
                const distance = this.calculateDistance(this.userLocationMarker, stache);
                //NOTE - this is the distence threshold that sets up 3-mile parameter from the set user location.
                return distance <= 3 && distance > 0.000005;
            }
            return false;
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
                    this.map.setZoom(20);
                }
            });
            this.searchResults = []; //NOTE check if this is working Clear search results after selecting a location
        },
    },


    mounted() {
        if (typeof google !== 'undefined') {

            this.getUserLocationAndDisplayMap();


        } else {
            //NOTE what is going on with my callbacks??
            // const script = document.createElement('script');
            // //  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&callback=Function.prototype`
            // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&libraries=places`;
            // script.onload = this.getUserLocationAndDisplayMap;
            // document.head.appendChild(script);
        }
    },
};
</script>
  
<style scoped lang="scss">
.glassCard {

    background: #41644a9d;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 3px solid rgba(241, 233, 0, 0.673);
}

.glassCard2 {
    /* From https://css.glass */
    background: rgba(139, 141, 104, 0.857);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 4px solid rgba(47, 28, 2, 0.345);
}

.map_card {
    border: 3px solid #29412fce;
    box-shadow: 0 10px 30px #41644ace;
    border-radius: 25px
}

.bg-stacheGreen {
    background: #41644ace;
}

.bg-stacheName {
    background: #ef9b0aa2;
}

.-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.favicon {
    padding: 5px;
    height: 50px;
    width: 50px;
}
</style>
  