<template>
    <div>
        <!-- <button class="txt-DrkGreen fnt-Cabin" @click="getUserLocationAndDisplayMap">Show Map</button>
        <button class="txt-DrkGreen fnt-Cabin" @click="addMarker">Add Marker</button> -->
        <div class="txt-DrkGreen fnt-Cabin" id="map" style="width: 100%; height: 400px; border-radius: 10px;"></div>
        <!-- List of added markers (optional) -->
        <div class="txt-DrkGreen fnt-Cabin">
            <!-- <h3 class="p-3">Added Markers:</h3>
            <ul>
                <li v-for="(marker, index) in markers" :key="index">{{ marker.title }}</li>
            </ul> -->
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
            // zooms in too far, either fix or leave commented out
            // centerMap()
        }

        // function addStacheMarker() {
        //     if (stache.value?.lat && map) {
        //         // eslint-disable-next-line no-undef
        //         addMarker({
        //             lat: stache.value.lat,
        //             lng: stache.value.lng,
        //             name: stache.value.stacheName
        //         })
        //     }
        // }

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









