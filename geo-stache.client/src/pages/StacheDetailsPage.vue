<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<template>
    <div v-if="stache">

        <section class="container pt-4">
            <div class="m-1 row glassCard2 p-2 justify-content-md-between justify-content-center">

                <div class="glassCard  col-12 col-md-6 m-2">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>


                    <router-link v-if="stache.creatorId" :to="{ name: 'Profile', params: { profileId: stache.creatorId } }">

                        <h3 class="text-center nameLink" title="Take me to profile page"> {{ stache.creator.name }} <img
                                class="profile-pic" :src="stache.creator.picture">
                        </h3>
                    </router-link>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>

                    <!-- <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p> -->
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p>this is a dummy location, we need to make the destination call off of the set lat lng</p> -->
                    <a class="justify-content-center d-flex pb-3 text-orange googleLink" id="googleMapsLink" target="_blank"
                        rel="noopener noreferrer">Open destination in Google Maps</a>

                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->
                    <div class="text-center">
                        <p>
                            <button class="revealButton collapsed col-md-3 col-5" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseWidthExample" aria-expanded="false"
                                aria-controls="collapseWidthExample">

                            </button>
                        </p>
                    </div>
                    <div class="justify-content-center d-flex" style="min-height: 120px;">
                        <div class="collapse collapse-horizontal" id="collapseWidthExample">
                            <div class="card card-body" style="width: 300px;">

                                <p class="text-center">{{ stache.hint }}</p>
                            </div>
                        </div>
                    </div>
                    <img class="stacheImage map_card m-2 " :src="stache.coverImage" alt="">
                    <section class="container">
                        <div v-show="!(account.id == stache.creatorId)" class="row">

                            <button class="col-6 adventureButton" v-if="!thisStacheAdventure" @click="addAdventure()"><i
                                    class="mdi mdi-plus"></i>Add to
                                your
                                Adventures
                            </button>

                            <button v-else class="col-6 adventureButton" @click="deleteAdventure()"><i
                                    class="mdi mdi-minus">Remove
                                    from
                                    your Adventures</i>
                            </button>
                            <button @click="completeAdventure()"
                                v-if="thisStacheAdventure && thisStacheAdventure.status == 'todo'"
                                class="col-6 foundButton">
                                Found It!
                            </button>
                        </div>
                    </section>



                </div>
                <!-- Camille testing things here -->
                <!-- <div class="col-12 col-md-5 p-0 m-0"><img class="stacheImage" :src="stache.coverImage" alt="">
                </div> -->
                <div class="m-2 map_card col-12 col-md-5 p-0 m-0" id="map" style="height: 50vh;"></div>

                <!-- //ANCHOR - Edit button-->
                <!-- <div class="justify-content-md-around justify-content-center row bg-DrkGreen rounded p-3 ">

                    <button v-show="account.id == stache.creatorId" data-bs-toggle="modal" data-bs-target="#id"
                        @click="makeStacheEditable" class=" button-class col-md-2 col-8 my-md-0 my-1 py-md-0 py-2">
                        Edit Stache <i class="mdi mdi-icon"></i>
                    </button>
                    <button v-show="account.id == stache.creatorId" @click="deleteStache"
                        class=" delete-button col-md-2 col-8 my-md-0 my-1 py-md-0 py-2">
                        Delete Stache <i class="mdi mdi-icon"></i>
                    </button>

                    <router-link :to="{ name: 'Map' }">
                        <button class="mapButton col-md-2 col-8 my-md-0 my-1 py-md-0 py-2">
                            Back to Maps </button>
                    </router-link>
                </div> -->

                <div class="d-flex justify-content-around bg-DrkGreen rounded p-3">
                    <button v-show="account.id == stache.creatorId" data-bs-toggle="modal" data-bs-target="#id"
                        @click="makeStacheEditable" class="button-class my-md-0 my-1 py-md-0 py-2">
                        Edit Stache <i class="mdi mdi-icon"></i>
                    </button>
                    <button v-show="account.id == stache.creatorId" @click="deleteStache"
                        class="delete-button my-md-0 my-1 py-md-0 py-2">
                        Delete Stache <i class="mdi mdi-icon"></i>
                    </button>
                    <router-link :to="{ name: 'Map' }">
                        <button class="mapButton my-md-0 my-1 py-md-0 py-2">
                            Back to Maps
                        </button>
                    </router-link>
                </div>

            </div>
            <!-- {{ stacheAdventures }} -->
        </section>
        <section class=" d-flex justify-content-evenly pt-3">
            <div>
                <div class="section-User elevation-5 rounded">
                    <h2 class="h2-User bg-DrkGreen rounded text-light p-2 elevation-5">List of Adventurers:</h2>
                    <div>
                        <div v-for="adventure in stacheAdventures" :key="adventure.id" class="h2-User fw-bold fs-3">
                            <div v-if="adventure.status == 'todo'">
                                <router-link v-if="adventure.accountId"
                                    :to="{ name: 'Profile', params: { profileId: adventure.accountId } }">
                                    <div class="text-DarkOrange">{{ adventure.profile.name }} <span>{{ adventure.toDoDate
                                    }}</span></div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="section-User elevation-5 rounded">
                    <h2 class="h2-User bg-DrkGreen rounded text-light elevation-5 p-2">have found:</h2>
                    <div>
                        <div v-for="adventure in stacheAdventures" :key="adventure.id" class="h2-User fw-bold fs-3">
                            <router-link v-if="adventure.accountId"
                                :to="{ name: 'Profile', params: { profileId: adventure.accountId } }">
                                <div v-if="adventure.status == 'completed'">
                                    <div class="text-DarkOrange"> <span> <img alt="logo"
                                                src="../assets/img/STACHE-Green.png" height="15" width="35" /></span> {{
                                                    adventure.profile.name }} <span class="text-darkGreen">{{ adventure.foundDate
    }}</span></div>

                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>



    <!-- STUB Comment section -->
    <section class="row container-fluid">
        <CommentForm />

        <div class="my-4" v-for="comment in stacheComments" :key="comment.id">

            <div class="container">
                <section class="row">
                    <div class="col-12 col-md-1">
                        <router-link v-if="comment.creatorId"
                            :to="{ name: 'Profile', params: { profileId: comment.creatorId } }">
                            <img class="profile-pic" :src="comment.creator.picture" alt="">
                        </router-link>
                    </div>
                    <div class="card elevation-5 col-12 col-md-10 m-2 pt-2 body-color">
                        <router-link v-if="comment.creatorId"
                            :to="{ name: 'Profile', params: { profileId: comment.creatorId } }">
                            <b class="p-1 text-DarkOrange">{{ comment.creator.name }}</b>
                        </router-link>
                        <p class="p-2">{{ comment.body }}</p>
                        <div class="text-end pb-2" v-if="account.id == comment.creatorId">
                            <button class="delete-button" @click="removeComment(comment.id)">delete</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { stachesService } from '../services/StachesService';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
// import { routerKey } from "vue-router";
import { useRouter } from "vue-router";
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import { adventuresService } from '../services/AdventuresService';
import { Modal } from "bootstrap";


export default {

    setup() {
        const route = useRoute();
        const router = useRouter();
        const stache = computed(() => AppState.activeStache)
        const lat = ref(-116.286672)
        const lng = ref(43.606798)
        const markers = ref([])
        let map = null
        let infoWindow = null
        const editStaches = ref({})

        onMounted(() => {
            getAdventuresByStacheId();
            getStacheById();
            getCommentsByStache()
            setupMap()
            addPolyline();
            // getAdventuresForActiveStache()
            // eslint-disable-next-line no-undef
        })

        function setupMap() {
            // debugger
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
                    markYourLocation()
                    addStacheMarker()

                    // eslint-disable-next-line no-undef
                    // setGoogleMapsLink();


                    centerMap(map)
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

            // centerMap()
        }

        function centerMap(map) {
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
        }

        function addStacheMarker() {
            if (stache.value?.lat && map) {

                // eslint-disable-next-line no-undef
                const stacheLocation = new google.maps.LatLng(stache.value.lat, stache.value.lng);

                // Create a marker for the stache location
                // eslint-disable-next-line no-undef
                const stacheMarker = new google.maps.Marker({
                    position: stacheLocation,
                    map: map,
                    title: stache.value.stacheName,
                });

                // Create an info window for the stache location
                // eslint-disable-next-line no-undef
                const stacheInfoWindow = new google.maps.InfoWindow({
                    content: stache.value.stacheName,
                });

                // Add a click event listener to open the info window when the marker is clicked
                stacheMarker.addListener('click', () => {
                    stacheInfoWindow.open(map, stacheMarker);
                });

                // Set the href attribute of the Google Maps link
                const googleMapsLink = document.getElementById('googleMapsLink');
                if (googleMapsLink) {
                    googleMapsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${stache.value.lat},${stache.value.lng}`;
                }

                // Center the map on the stache location
                map.setCenter(stacheLocation);
                map.setZoom(11);
                addPolyline() // Adjust the zoom level as needed
            }
        }
        // async function getAdventuresForActiveStache() {
        //     try {
        //         await adventuresService.getAdventuresByStacheId(route)
        //     } catch (error) {
        //         Pop.error(error, '[ActiveEvenPage: getTicketsForActiveEvent()]')
        //     }
        // }


        function addPolyline() {
            if (map) {
                // Create an array of LatLng objects representing the line's path
                const polylineCoordinates = [
                    { lat: lat.value, lng: lng.value }, // User location
                    { lat: stache.value.lat, lng: stache.value.lng }, // ActiveStache location
                ];

                // Create a Polyline object
                // eslint-disable-next-line no-undef
                const polyline = new google.maps.Polyline({
                    path: polylineCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000', // Line color (you can change this)
                    strokeOpacity: 1.0,
                    strokeWeight: 2, // Line thickness
                });

                // Set the Polyline on the map
                polyline.setMap(map);
            }
        }

        // Call the function to add the polyline
        addPolyline();


        async function getCommentsByStache() {
            try {
                await commentsService.getCommentsByStache(route.params.stacheId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getStacheById() {
            try {
                await stachesService.getStacheById(route.params.stacheId)
                addStacheMarker()
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getAdventuresByStacheId() {
            try {
                await adventuresService.getAdventuresByStacheId(route.params.stacheId)
            } catch (error) {
                Pop.error(error)
            }
        }

        // async function completeAdventure() {
        //     try {
        //         logger.log('route.params:', route.params);
        //         logger.log('route.params.stacheId:', route.params.stacheId);

        //         const stacheId = route.params.stacheId
        //         let advToComplete = AppState.myAdventures.find(a => a.stacheId == stacheId)
        //         // debugger
        //         await adventuresService.completeAdventure(advToComplete.id)

        //         advToComplete.foundDate = new Date();

        //         Pop.success('Completed Adventure!')
        //     } catch (error) {
        //         logger.log(error)
        //         Pop.error(error)
        //     }
        // }

        // watchEffect(() => {
        //     completeAdventure()
        // });


        return {

            stache,
            editStaches,
            setupMap,
            map,
            account: computed(() => AppState.account),
            activeAdventures: computed(() => AppState.activeAdventures),
            stacheComments: computed(() => AppState.stacheComments),
            stacheAdventures: computed(() => AppState.activeStacheAdventures),
            myAdventures: computed(() => AppState.myAdventures),
            adventures: computed(() => AppState.adventures),
            thisStacheAdventure: computed(() => {
                return AppState.myAdventures.find(a => a.stacheId == route.params.stacheId)
            }),




            async removeComment(id) {
                try {
                    if (await Pop.confirm()) {
                        // let comment = AppState.stacheComments.find(c => c.id == id)
                        await commentsService.removeComment(id)
                        Pop.success('removed comment')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },
            //ANCHOR - Edit stache
            makeStacheEditable() {
                stachesService.makeStacheEditable(editStaches.value, route.params.stacheId)
            },

            async deleteStache() {
                try {
                    if (await Pop.confirm()) {
                        await stachesService.deleteStache(route.params.stacheId)
                        Pop.success('Successfully deleted stache')
                        router.push({ name: "Home" })
                    }

                } catch (error) {
                    Pop.error(error)
                }
            },


            async addAdventure() {
                try {
                    // let adventureData = AppState.myAdventures.find(a => a.stacheId == route.params.stacheId)
                    await adventuresService.addAdventure(route.params.stacheId)
                    Pop.success('Adventure has been added to your list!')
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },
            async deleteAdventure() {
                try {
                    if (await Pop.confirm('Are you sure?')) {

                        let adventureId = AppState.myAdventures.find(a => a.stacheId == route.params.stacheId)
                        await adventuresService.deleteAdventure(adventureId)

                    }
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },

            async completeAdventure() {
                try {
                    // debugger
                    // logger.log('route.params:', route.params);
                    // logger.log('route.params.stacheId:', route.params.stacheId);

                    const stacheId = route.params.stacheId
                    let advToComplete = AppState.myAdventures.find(a => a.stacheId == stacheId)
                    await adventuresService.completeAdventure(advToComplete.id)

                    advToComplete.foundDate = new Date();

                    Pop.success('Completed Adventure!')
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }



        };

    },

    methods: {
        // calculateDistance(lat1, lon1, lat2, lon2) {
        //     const R = 3958.8; // Radius of the Earth in miles
        //     const dLat = (lat2 - lat1) * (Math.PI / 180);
        //     const dLon = (lon2 - lon1) * (Math.PI / 180);
        //     const a =
        //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //         Math.cos(lat1 * (Math.PI / 180)) *
        //         Math.cos(lat2 * (Math.PI / 180)) *
        //         Math.sin(dLon / 2) *
        //         Math.sin(dLon / 2);
        //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //     const distance = R * c;
        //     return distance.toFixed(2); // Round to 2 decimal places
        // },

        // searchLocation() {
        //     if (this.searchQuery && this.map) {
        //         if (!this.searchService) {
        //             // eslint-disable-next-line no-undef
        //             this.searchService = new google.maps.places.AutocompleteService();
        //         }

        //         this.searchService.getPlacePredictions(
        //             {
        //                 input: this.searchQuery,
        //                 componentRestrictions: { country: 'US' },
        //             },
        //             (predictions) => {
        //                 if (predictions && predictions.length > 0) {
        //                     const place = predictions[0];
        //                     // eslint-disable-next-line no-undef
        //                     const placeService = new google.maps.places.PlacesService(this.map);
        //                     placeService.getDetails(
        //                         { placeId: place.place_id },
        //                         (result, status) => {
        //                             // eslint-disable-next-line no-undef
        //                             if (status === google.maps.places.PlacesServiceStatus.OK) {
        //                                 this.map.setCenter(result.geometry.location);
        //                             }
        //                         }
        //                     );
        //                 }
        //             }
        //         );
        //     } else {
        //         alert('Map not initialized or search query is empty.');
        //     }
        // },

        // selectLocation(result) {
        //     // Center the map on the selected location
        //     // eslint-disable-next-line no-undef
        //     const placeService = new google.maps.places.PlacesService(this.map);
        //     placeService.getDetails({ placeId: result.place_id }, (place) => {
        //         if (place && place.geometry && place.geometry.location) {
        //             const location = place.geometry.location;
        //             this.map.setCenter(location);
        //             this.map.setZoom(20); // Adjust the zoom level as needed
        //         }
        //     });
        //     this.searchResults = []; // Clear search results after selecting a location
        // },
    }
};
</script>


<style scoped lang="scss">
.greenButton .orangeButton .YellowButton .map-button {
    background: linear-gradient(25deg, var(--Yellow), var(--Sand));
    border: solid 2px var(--UltraDrkGreen);
    border-radius: 20px;
    padding: 2px;
    transform: background 0.3s, transform 0.2s;
}

.map-button:hover {
    background: linear-gradient(25deg, var(--Sand), var(--Yellow));
    transform: scale(1.1);
}

.button-class {
    background: linear-gradient(25deg, var(--Green), var(--Sand));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
}

.button-class:hover {
    background: linear-gradient(25deg, var(--LghtGreen), var(--DrkGreen));
    transform: translateY(-5px);
    color: var(--UltraDrkGreen)
}

.delete-button {
    background: linear-gradient(25deg, var(--Orange), var(--LghtOrange));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--LghtOrange);
}

.delete-button:hover {
    background: linear-gradient(25deg, var(--LghtOrange), var(--Orange));
    transform: translateY(-5px);
    border-color: var(--DrkOrange);
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.stacheImage {
    width: 100%;
    object-fit: cover;
    object-position: center;
    max-height: 30vh;
    min-height: 20vh;
    max-width: 55vh;
    min-width: 20vh;

}

.map_card {
    border: 3px solid var(--UltraDrkGreen);
    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
        0 5px 6px 0 rgba(43, 43, 43, 0.79),
        0 1px 8px 0 rgba(43, 43, 43, 0.79);
    border-radius: 16px
}

.glassCard {
    background: var(--LghtGreen);
    border-radius: 16px;
    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
        0 5px 6px 0 rgba(43, 43, 43, 0.79),
        0 1px 8px 0 rgba(43, 43, 43, 0.79);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 3px solid var(--DrkGreen);
}

.glassCard2 {
    /* From https://css.glass */
    background: var(--MdLghtGreen);
    border-radius: 16px;
    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
        0 5px 6px 0 rgba(43, 43, 43, 0.79),
        0 1px 8px 0 rgba(43, 43, 43, 0.79);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 4px solid #2f1c0258;
}

.revealButton {
    background: linear-gradient(25deg, var(--Green), var(--Sand));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--Sand);
    padding: 0.5em;

}

.revealButton:hover {
    background: linear-gradient(var(--Sand), var(--Green));
    transform: scale(1.1);
    border-color: var(--Green);
}

.revealButton:before {
    content: 'Hide Hint';
    display: block;
}

.revealButton.collapsed:before {
    content: 'Reveal Hint';
    display: block;
}

.adventureButton {
    background: linear-gradient(25deg, var(--Orange), var(--LghtOrange));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--LghtOrange);
    margin-bottom: 1em;
    padding: 0.5em;
}

.adventureButton:hover {
    background: linear-gradient(25deg, var(--LghtOrange), var(--Orange));
    transform: translateY(-5px);
    border-color: var(--DrkOrange);
}

.foundButton {
    background: linear-gradient(25deg, var(--Yellow), var(--Sand));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--Yellow);
    margin-bottom: 1em;
    padding: 0.5em;
}

.foundButton:hover {
    background: linear-gradient(25deg, var(--Sand), var(--Yellow));
    transform: translateY(-5px);
    border-color: var(--DrkYellow);
}

.mapButton {
    background: linear-gradient(25deg, var(--Yellow), var(--Sand));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--Yellow);
    margin-bottom: 1em;
    padding: 0.5em;
}

.mapButton:hover {
    background: linear-gradient(25deg, var(--Sand), var(--Yellow));
    transform: translateY(-5px);
    border-color: var(--DrkYellow);
}

.nameLink:hover {
    transform: scale(1.1);

}

.nameLink {
    color: var(--Orange);
}

.background-color {
    background-color: var(--DrkGreen);
    backdrop-filter: blur(5px);
}

.card-body {
    background-color: var(--Sand);
}

.body-color {
    background: linear-gradient(25deg, var(--LghtGreen), var(--Sand));
}

.googleLink:hover {
    transform: scale(1.1)
}

.section-User {
    padding: 20px;
    background-color: #f5f5f5;
}

/* Style the list headers */
.h2-user {
    font-size: 24px;
    margin-bottom: 10px;
}

/* Style individual adventure items */
.adventure-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    background-color: white;
}

/* Style the names and dates */
.adventure-item div {
    margin: 5px 0;
}
</style>