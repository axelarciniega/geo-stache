<template>
    <div>
        <form @submit.prevent="createStache()">
            <!-- Stache Name Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="stacheName">Stache Name:</label>
                <input placeholder="" type="text" id="stacheName" v-model="stacheName" minlength="3" maxlength="50"
                    required />
            </div>

            <!-- Latitude Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="lat">Latitude</label>
                <input placeholder="Enter full Latitude, no rounding." type="text" id="lat" v-model="lat" minlength="3"
                    maxlength="50" required />
            </div>

            <!-- Longitude Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="lng">Longitude</label>
                <input placeholder="Enter full Longitude, no rounding." type="text" id="lng" v-model="lng" minlength="3"
                    maxlength="50" required />
            </div>

            <!-- Cover Image Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="coverImg">Cover Image:</label>
                <input placeholder="This is the URL to your image." type="text" id="coverImg" v-model="coverImg"
                    minlength="5" :maxlength="1000" required />
            </div>

            <!-- Badge Image Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="coverImg">Badge Image:</label>
                <input placeholder="Leave blank if you want to use your Cover Image." type="text" id="coverImg"
                    v-model="coverImg" minlength="5" :maxlength="1000" />
            </div>

            <!-- Stache Description Input -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="description">Stache Description:</label>
                <textarea placeholder="Describe your Stache, only. Hints go below." id="description" v-model="description"
                    minlength="10" maxlength="1000" required></textarea>
            </div>

            <!-- Local Area Select -->
            <div class="form-group col-12 col-md-10 mb-3">
                <label for="locationTag">Local Area:</label>
                <select id="locationTag" v-model="locationTag" required>
                    <option value="Boise">Boise</option>
                    <!-- Add more cities within a 50-mile radius of Boise, Idaho -->
                </select>
            </div>

            <!-- Difficulty Select -->
            <div class="form-group col-12 mb-3">
                <label for="difficulty">Difficulty:</label>
                <select id="difficulty" v-model="difficulty" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <!-- Hint Input -->
            <div class="form-group col-12 mb-3 w-100">
                <label for="hint">Hint:</label>
                <textarea
                    placeholder="This hint is revealed when Stachers need extra help and is hidden until the adventurer asks for help."
                    id="hint" v-model="hint" minlength="10" maxlength="500" required></textarea>
            </div>
            <button>submit</button>
        </form>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { stachesService } from '../services/StachesService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const eventData = ref({})
        const router = useRouter()
        function resetForm() {
            eventData.value = { type: '' }
        }
        onMounted(() => {
            resetForm()
        })
        return {
            eventData,
            async createStache() {
                try {

                    let newEvent = await stachesService.createStache(eventData.value)
                    Pop.toast('Stache Created', 'success')
                    resetForm()
                    Modal.getOrCreateInstance('#id').hide()
                    // router.push({ name: 'Stache Details', params: { stachId: newStache.id } })
                    // FIXME enter correct params
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.preview-image {
    max-height: 15vh;
    object-fit: contain;
}
</style>