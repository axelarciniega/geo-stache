<template>
    <div>
        <button class="txt-DrkGreen fnt-Cabin" @click="getUserLocationAndDisplayMap">Show Map</button>
        <button class="txt-DrkGreen fnt-Cabin" @click="addMarker">Add Marker</button>
        <div class="txt-DrkGreen fnt-Cabin" id="map" style="width: 100%; height: 400px;"></div>
        <!-- List of added markers (optional) -->
        <div class="txt-DrkGreen fnt-Cabin">
            <h3>Added Markers:</h3>
            <ul>
                <li v-for="(marker, index) in markers" :key="index">{{ marker.title }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { logger } from '../utils/Logger.js';
export default {
    data() {
        return {
            map: null,
            markers: [], // To store markers added to the map
        };
    },
    methods: {
        getUserLocationAndDisplayMap() {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // FIXME Cannot have google undefined as it will cause errors.
                    // NOTE - hasn't this been working?
                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: latitude, lng: longitude },
                        zoom: 15,
                    });
                    // Create a marker at the user's location
                    // FIXME Cannot have google undefined as it will cause errors.
                    const userMarker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: this.map,
                        title: 'Your Location',
                    });
                    // Add the userMarker to the markers array
                    this.markers.push(userMarker);
                });
            } else {
                alert('Geolocation is not available in your browser');
            }
        },
        addMarker() {
            if (this.map) {
                // Get the user's location
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // Create a new marker at the user's location
                    const marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: this.map,
                        title: 'Custom Marker',
                    });
                    this.markers.push(marker);
                    logger.log(marker)
                });
            } else {
                alert('Map not initialized. Please click "Show Map" first.');
            }
        },
    },
    mounted() {
        if (typeof google !== 'undefined') {
            this.getUserLocationAndDisplayMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key= AIzaSyBifxFAXD3ecZoO52GpjV-STjO1LB1NnRg&libraries=places`;
            script.onload = this.getUserLocationAndDisplayMap;
            document.head.appendChild(script);
        }
    },
};
</script>
<style scoped lang="scss">
/* Your scoped CSS styles here */
</style>









