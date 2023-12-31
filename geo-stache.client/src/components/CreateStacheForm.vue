<template>
    <div class="txt-DrkGreen ftn-Cabin">
        <form class="text-sand" @submit.prevent="handleSubmit">
            <h1 class="text-center text-black">Stache Create Form</h1>
            <!-- Stache Name Input -->
            <div class="form-group">
                <label class="text-name" for="stacheName">Stache Name:</label>
                <input type="text" id="stacheName" v-model="stacheData.stacheName" minlength="2" maxlength="50" required
                    class="form-control bg-sand" />
            </div>
            <!-- Stache Description Input -->
            <div class="form-group">
                <label for="description">Stache Description:</label>
                <textarea id="description" v-model="stacheData.description" minlength="10" maxlength="1000" required
                    class="form-control bg-sand"></textarea>
            </div>
            <!-- Latitude and Longitude Fields -->
            <div class="form-group">
                <label for="lat">Latitude:</label>
                <input type="text" id="lat" v-model="stacheData.lat" minlength="3" maxlength="50" required
                    class="form-control bg-sand" />
            </div>
            <div class="form-group">
                <label for="lng">Longitude:</label>
                <input type="text" id="lng" v-model="stacheData.lng" minlength="3" maxlength="50" required
                    class="form-control bg-sand" />
            </div>
            <!-- Cover Image Input -->
            <div class="form-group">
                <label for="coverImg">Cover Image:</label>
                <input type="text" id="coverImg" v-model="stacheData.coverImage" minlength="5" :maxlength="255" required
                    class="form-control bg-sand" />
            </div>
            <!-- Badge Image Input -->
            <div class="form-group">
                <label for="badgeImage">Badge Image:</label>
                <input type="text" id="badgeImage" v-model="stacheData.badgeImage" minlength="5" :maxlength="255" required
                    class="form-control bg-sand" />
            </div>
            <!-- Local Area Select -->
            <!-- <div class="form-group">
                <label for="locationTag">Local Area:</label>
                <select id="locationTag" v-model="stacheData.locationTag" required class="form-control bg-sand">
                    <option value="Boise">Boise</option>
                    Add more cities within a 50-mile radius of Boise, Idaho
                </select>
            </div> -->
            <!-- Difficulty Select -->
            <div class="form-group">
                <label for="difficulty">Difficulty:</label>
                <select id="difficulty" v-model="stacheData.difficulty" required class="form-control bg-sand">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <!-- Hint Input -->
            <div class="form-group">
                <label for="hint">Hint:</label>
                <textarea id="hint" v-model="stacheData.hint" minlength="10" maxlength="500" required
                    class="form-control bg-sand"></textarea>
            </div>

            <button v-if="activeStacheToEdit == null" class="btn bg-orange mt-3 sub-btn SubmitStacheButton">Submit</button>
            <button v-else class="btn bg-orange mt-3 sub-btn SubmitStacheButton">Save Changes</button>

        </form>
    </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { stachesService } from '../services/StachesService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger';
import { AppState } from "../AppState.js";



export default {
    setup() {
        const stacheData = ref({});
        const router = useRouter();

        // Function to reset the form
        function resetForm() {
            stacheData.value = { type: '' };
        }

        // Function to get coordinates from Geolocation API
        async function getCoordinatesFromGeolocation() {
            if ('geolocation' in navigator) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            (position) => resolve(position),
                            (error) => reject(error)
                        );
                    });

                    // Automatically set the coordinates in the input fields
                    stacheData.value.lat = position.coords.latitude;
                    stacheData.value.lng = position.coords.longitude;
                } catch (error) {

                    logger.error('Error getting geolocation:', error);
                    Pop.error('Error getting geolocation. Please try again.');
                }
            } else {

                logger.error('Geolocation is not available in your browser');
            }
        }



        // eslint-disable-next-line space-before-function-paren
        onMounted(async () => {
            resetForm();
            await getCoordinatesFromGeolocation();
        });

        watchEffect(()=> {
            if(AppState.activeStacheToEdit){
                stacheData.value = {...AppState.activeStacheToEdit}
            }
            else{
                resetForm()
                getCoordinatesFromGeolocation()
            }
        })

        return {
            stacheData,
            activeStacheToEdit: computed(() => AppState.activeStacheToEdit),
            async handleSubmit() {
                try {
                    let newStache = stacheData.value
                    if (stacheData.value.id){
                    await stachesService.makeStacheEditable(stacheData.value, stacheData.value.id)
                    }else{
                        newStache = await stachesService.createStache(stacheData.value);
                    }
                    if(AppState.activeStacheToEdit == null){
                        Pop.success('Created Stache')
                    }else{Pop.success('Edited Stache')}
                    resetForm();
                    Modal.getOrCreateInstance('#id').hide();
                    router.push({ name: 'Stache Details', params: { stacheId: newStache.id } })
                } catch (error) {
                    Pop.error(error);
                }
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.sub-btn {
    background-color: var(--DrkGreen);
    color: var(--Sand);
    transition: background-color 0.3s, color 0.3s;
}

.sub-btn:hover {
    background-color: var(--Green);
    color: var(--Sand);
}


.preview-image {
    max-height: 15vh;
    object-fit: contain;
}

.SubmitStacheButton:hover{
    transform: scale(1.1);
}
</style>
