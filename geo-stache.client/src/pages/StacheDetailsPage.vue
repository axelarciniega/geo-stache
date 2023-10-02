<template>
    <div v-if="stache">
        <section class="container">
            <div class="row border border-black border-3">

                <div class="col-12 col-md-7">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>

                    <!-- <router-link :to="{ name: 'Profile', params: { profileId: stache.creatorId } }"> -->
                    <!-- <router-link :to="{ path: `accounts/${account.id}` }"> -->

                    <router-link v-if="stache.creatorId" :to="{ name: 'Profile', params: { profileId: stache.creatorId } }">

                        <h3 class="text-end"> {{ stache.creator.name }} <img class="profile-pic"
                                :src="stache.creator.picture">
                        </h3>
                    </router-link>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>
                    <p class="text-center">Hint: {{ stache.hint }}</p>
                    <!-- <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p> -->
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->

                    <button v-if="isMyAdventure" @click="addAdventure()"><i class="mdi mdi-plus"></i>Add to your Addventures
                    </button>

                    <button v-else @click="removeAdventure()"><i class="mdi mdi-minus">Remove from your Adventrues</i>
                    </button>

                </div>
                <!-- Camille testing things here -->
                <!-- <div class="col-12 col-md-5 p-0 m-0"><img class="stacheImage" :src="stache.coverImage" alt="">
                </div> -->
                <div class="map_card col-12 col-md-5 p-0 m-0" id="map" style="height: 50vh;"></div>


                <div class="justify-content-around d-flex my-3">
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


        <div v-if="stacheAdventures.length > 0" class="bg-danger">
            {{ stacheAdventures }}
        </div>


        <!-- STUB Comment section -->
        <section class="row">
            <CommentForm />

            <div class="my-4" v-for="comment in stacheComments" :key="comment.id">
                <!-- STUB Comment Card -->
                <!-- <CommentCard :stacheComment="comment"/> -->
                <div class="container">
                    <section class="row">
                        <div class="col-12 col-md-1">
                            <img class="profile-pic" :src="comment.creator.picture" alt="">
                        </div>
                        <div class="card elevation-5 col-12 col-md-6 my-2">
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
import { computed, onMounted, ref } from 'vue';
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
        const isToDo = ref(false);
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            getStacheById();
            getCommentsByStache()
        })

        // TODO get adventures for this stache

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
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            // isToDo,
            stache: computed(() => AppState.activeStache),
            account: computed(() => AppState.account),
            stacheComments: computed(() => AppState.stacheComments),
            map: null,
            stacheAdventures: computed(() => AppState.activeStacheAdventures),
            myAdventures: computed(() => AppState.myAdventures),
            isMyAdventure: computed(() => {
                let isFound = true
                for (let i = 0; i <= AppState.activeStacheAdventures.length; i++) {
                    for (let j = 0; j <= AppState.myAdventures.length; j++) {
                        if (i == j) {
                            isFound = false
                        }
                    }
                }
                return isFound
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

            // NOTE refer to album page createCollab. I progress means they have added to thier ToDo list, but have not yet completed or FOUND the Stache.
            // NOTE Do we want the user to be able to remove once the Stache is already found?
            // like Mick's from PostIt, flips a bool and not what we want.
            async addAdventure() {
                try {
                    let adventureData = { stacheId: route.params.stacheId }
                    await adventuresService.addAdventure(adventureData)

                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },


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

                    new google.maps.Marker({

                        position: { lat: AppState.activeStache.lat, lng: AppState.activeStache.lng },
                        map: this.map,
                        title: `$(stache.stacheName)`
                    })

                    // AppState.activeStache.find((stache) => {
                    //     const distance = this.calculateDistance(
                    //         latitude,
                    //         longitude,
                    //         stache.lat,
                    //         stache.lng
                    //     );
                    //     stache.distance = distance; // Store the distance in the stache object
                    //     logger.log(this.map);
                    //     new google.maps.Marker({
                    //         position: { lat: stache.lat, lng: stache.lng },
                    //         map: this.map,
                    //         title: `${stache.stacheName}`,
                    //     });
                    // });
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
                    this.map.setZoom(20); // Adjust the zoom level as needed
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
            //  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&callback=Function.prototype`
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&libraries=places`;
            script.onload = this.getUserLocationAndDisplayMap;
            document.head.appendChild(script);
        }
    },
};
</script>


<style scoped lang="scss">
.button-class {
    background: linear-gradient(25deg, #41644A, #adc7b3);
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s
}

.button-class:hover {
    background: linear-gradient(25deg, #adc7b3, #41644A);
    transform: translateY(-5px);
}

.delete-button {
    background: linear-gradient(25deg, #E86A33, #e68b64);
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
}

.delete-button:hover {
    background: linear-gradient(25deg, #e68b64, #E86A33);
    transform: translateY(-5px);
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
</style>