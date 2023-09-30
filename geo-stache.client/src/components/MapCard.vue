<template>
    <div>
        <!-- FIXME The buttons are hidden behind the map somehow. -->
        <!-- FIXME Maybe add container to the div above and use padding to ensure the buttons show. -->
        <button @click="getUserLocationAndDisplayMap">Show Map</button>
        <button @click="addMarker">Add Marker</button>
        <div id="map" style="width: 100%; height: 400px;"></div>
        <!-- List of added markers (optional) -->
        <div>
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
                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: latitude, lng: longitude },
                        zoom: 15,
                    });
                    // Create a marker at the user's location
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









