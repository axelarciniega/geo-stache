<template>
    <div v-if="stache">
        <!-- <button @click="setupMap">Test Me</button> -->
        <section class="container">
            <div class="m-1 row glassCard2 p-2 justify-content-between">

                <div class="glassCard  col-12 col-md-6 m-2">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>

                    <!-- FIXME  -->
                    <router-link v-if="stache.creatorId" :to="{ name: 'Profile', params: { profileId: stache.creatorId } }">

                        <h3 class="text-center nameLink" title="Take me to profile page"> {{ stache.creator.name }} <img
                                class="profile-pic" :src="stache.creator.picture">
                        </h3>
                    </router-link>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>
                    <!-- <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p> -->
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->
                    <div class="text-center">
                        <p>
                            <button class="revealButton" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseWidthExample" aria-expanded="false"
                                aria-controls="collapseWidthExample">
                                Reveal Hint
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

                    <button v-if="!thisStacheAdventure" class="adventureButton" @click="addAdventure()"><i
                            class="mdi mdi-plus"></i>Add to
                        your
                        Adventures
                    </button>

                    <button v-else class="adventureButton" @click="deleteAdventure()"><i class="mdi mdi-minus">Remove from
                            your Adventures</i>
                    </button>

                </div>
                <!-- Camille testing things here -->
                <!-- <div class="col-12 col-md-5 p-0 m-0"><img class="stacheImage" :src="stache.coverImage" alt="">
                </div> -->
                <div class="m-2 map_card col-12 col-md-5 p-0 m-0" id="map" style="height: 50vh;"></div>


                <div class="justify-content-around d-flex bg-DrkGreen rounded p-3 ">
                    <button v-show="account.id == stache.creatorId" @click="editStache"
                        class=" button-class border border-1 border-black col-md-2">
                        edit <i class="mdi mdi-icon"></i>
                    </button>
                    <button v-show="account.id == stache.creatorId" @click="deleteStache"
                        class=" delete-button border border-1 border-black col-2 text-black">
                        delete <i class="mdi mdi-icon"></i>
                    </button>
                    <router-link :to="{ name: 'Map' }">
                        <div class="btn btn-warning border border-1 border-black rounded-pill elevation-5">back to maps
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
        <section class="container">
            <div class="row">
                <div class="col-12">
                    <!-- <div v-for="adventure in myAdventures" :key="adventure.id" class="col-3">
                        <ToDoCard :adventure="adventure" />
                    </div> -->

                    <!-- <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                        aria-controls="offcanvasExample">
                        Link with href
                    </a> -->
                    <!-- STUB -->
                    <button class="col-2 btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Button with data-bs-target
                    </button>

                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
                        aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                        </div>
                        <div>
                            <div v-for="adventure in myAdventures" :key="adventure.id" class="col-3">
                                <ToDoCard :adventure="adventure" />
                            </div>
                        </div>
                        <div class="dropdown mt-3">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Dropdown button
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <!-- <div v-for="adventure in myAdventures" :key="adventure.id" class="col-3">
                        <BadgeCard :adventure="yourAdventureData" :myAdventures="yourMyAdventuresData" />
                    </div> -->
                </div>


            </div>
        </section>


        <!-- STUB Comment section -->
        <section class="row container-fluid">
            <CommentForm />

            <div class="my-4" v-for="comment in stacheComments" :key="comment.id">

                <div class="container">
                    <section class="row">
                        <div class="col-12 col-md-1">
                            <img class="profile-pic" :src="comment.creator.picture" alt="">
                        </div>
                        <div class="card elevation-5 col-12 col-md-10 my-2 body-color">
                            <b>{{ comment.creator.name }}</b>
                            <p>{{ comment.body }}</p>
                            <div class="text-end" v-if="account.id == comment.creatorId">
                                <button class="delete-button" @click="removeComment">delete</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>


    </div>
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
            getStacheById();
            getCommentsByStache()
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
                    markYourLocation()
                    addStacheMarker()
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

            centerMap()
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
        }

        function addStacheMarker() {
            if (stache.value?.lat && map) {
                // eslint-disable-next-line no-undef
                addMarker({
                    lat: stache.value.lat,
                    lng: stache.value.lng,
                    name: stache.value.stacheName
                })
            }
        }



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

        // const isMyAdventure = computed(() => {
        //     let isFound = true
        //     for (let i = 0; i <= AppState.activeStacheAdventures.length; i++) {
        //         for (let j = 0; j <= AppState.myAdventures.length; j++) {
        //             if (i == j) {
        //                 isFound = false
        //             }
        //         }
        //     }
        //     return isFound
        // });

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


            async removeComment() {
                try {
                    if (await Pop.confirm()) {
                        let comment = AppState.stacheComments.find(c => c.accountId == AppState.stacheComments.accountId)
                        await commentsService.removeComment(comment.id)
                        Pop.success('removed comment')
                    }
                } catch (error) {
                    Pop.error(error)
                }
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
                    let adventureData = { stacheId: route.params.stacheId }
                    await adventuresService.addAdventure(adventureData)
                    Pop.success('Adventure has been added to your list!')
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },
            async deleteAdventure() {
                try {
                    if (await Pop.confirm('Are you sure?')) {
                        const adventureToRemove = AppState.myAdventures.find(a => a.accountId == AppState.myAdventures.accountId)
                        const adventureId = adventureToRemove.id
                        await adventuresService.deleteAdventure(adventureId)
                        Pop.success('removed adventure')
                    }
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },

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
.map-button {
    background: linear-gradient(45deg, var(--Yellow), var(--Sand));
    border: solid 2px var(--UltraDrkGreen);
    border-radius: 20px;
    padding: 2px;
    color: var(--DrkGreen);
    transform: background 0.3s, transform 0.2s;
}

.map-button:hover {
    background: linear-gradient(45deg, var(--Sand), var(--Yellow));
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
}

.map_card {
    border: 3px solid var(--UltraDrkGreen);
    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
        0 5px 6px 0 rgba(43, 43, 43, 0.79),
        0 1px 8px 0 rgba(43, 43, 43, 0.79);
    border-radius: 25px
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

}

.revealButton:hover {
    background: linear-gradient(var(--Sand), var(--Green));
    transform: scale(1.1);
    border-color: var(--Green);
}


.adventureButton {
    background: linear-gradient(25deg, var(--Orange), var(--LghtOrange));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
    border-color: var(--LghtOrange);
    margin-bottom: 1em;

}

.adventureButton:hover {
    background: linear-gradient(25deg, var(--LghtOrange), var(--Orange));
    transform: translateY(-5px);
    border-color: var(--DrkOrange);
}

.nameLink:hover {
    transform: scale(1.1);

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

.nameLink {
    color: var(--Orange);
}

.background-color {
    background-color: var(--DrkGreen);
    backdrop-filter: blur(5px);
}

.card-body {
    background-color: var(--LghtGreen);
}

.body-color {
    background: linear-gradient(25deg, var(--LghtGreen), var(--Sand));
}
</style>