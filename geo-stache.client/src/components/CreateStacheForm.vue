<template>
    <div>
        <form @submit.prevent="createStache()">

            <!-- Stache Name Input -->
            <div class=" form-group">
                <label for="stacheName">Stache Name:</label>
                <input type="text" id="stacheName" v-model="stacheName" minlength="3" maxlength="50" required />
                <small class="text-muted">Minimum length: 3, Maximum length: 50 characters</small>
            </div>

            <!-- Latitude Input -->
            <div class=" form-group">
                <label for="lat">Latitude</label>
                <input type="text" id="lat" v-model="lat" minlength="3" maxlength="50" required />
                <small class="text-muted">Minimum length: 3, Maximum length: 50 characters</small>
            </div>

            <!-- Longitude Input -->
            <div class=" form-group">
                <label for="lng">Longitude</label>
                <input type="text" id="lng" v-model="lng" minlength="3" maxlength="50" required />
                <small class="text-muted">Minimum length: 3, Maximum length: 50 characters</small>
            </div>

            <!-- Cover Image Input -->
            <div class="form-group">
                <label for="coverImg">Cover Image:</label>
                <input type="text" id="coverImg" v-model="coverImg" minlength="5" :maxlength="255" required />
                <small class="text-muted">Minimum length: 5, Maximum length: 255 characters</small>
            </div>

            <!-- Badge Image Input -->
            <div class="form-group">
                <label for="coverImg">Cover Image:</label>
                <input type="text" id="coverImg" v-model="coverImg" minlength="5" :maxlength="255" required />
                <small class="text-muted">Minimum length: 5, Maximum length: 255 characters</small>
            </div>

            <!-- Stache Description Input -->
            <div class="form-group">
                <label for="description">Stache Description:</label>
                <textarea id="description" v-model="description" minlength="10" maxlength="1000" required></textarea>
                <small class="text-muted">Minimum length: 10, Maximum length: 1000 characters</small>
            </div>

            <!-- Local Area Select -->
            <div class="form-group">
                <label for="locationTag">Local Area:</label>
                <select id="locationTag" v-model="locationTag" required>
                    <option value="Boise">Boise</option>
                    <!-- Add more cities within a 50-mile radius of Boise, Idaho -->
                </select>
            </div>

            <!-- Difficulty Select -->
            <div class="form-group">
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
            <div class="form-group">
                <label for="hint">Hint:</label>
                <textarea id="hint" v-model="hint" minlength="10" maxlength="500" required></textarea>
                <small class="text-muted">Minimum length: 10, Maximum length: 500 characters</small>
            </div>
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
                    Modal.getOrCreateInstance('#create-stache').hide()
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