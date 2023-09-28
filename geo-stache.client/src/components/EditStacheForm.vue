<template>
    <div>

        <form v-if="activeStache" @submit.prevent="editStache">
            <h1 class="text-center">Stache Create Form</h1>
            <!-- Stache Name Input -->
            <div class=" form-group">
                <label for="stacheName">Stache Name:</label>
                <input type="text" id="stacheName" v-model="stacheData.stacheName" minlength="2" maxlength="50" required
                    class="form-control" />

            </div>
            <!-- Stache Description Input -->
            <div class="form-group">
                <label for="description">Stache Description:</label>
                <textarea id="description" v-model="stacheData.description" minlength="10" maxlength="1000" required
                    class="form-control"></textarea>

            </div>
            <div class="row">
                <!-- Latitude Input -->
                <div class="form-group col-6">
                    <label for="lat">Latitude:</label>
                    <input type="text" id="lat" v-model="stacheData.lat" minlength="3" maxlength="50" required
                        class="form-control" />

                </div>
                <!-- Longitude Input -->
                <div class=" form-group col-6">
                    <label for="lng">Longitude:</label>
                    <input type="text" id="lng" v-model="stacheData.lng" minlength="3" maxlength="50" required
                        class="form-control" />
                </div>
            </div>

            <!-- Cover Image Input -->
            <div class="form-group">
                <label for="coverImg">Cover Image:</label>
                <input type="text" id="coverImg" v-model="stacheData.coverImg" minlength="5" :maxlength="1000" required
                    class="form-control" />
            </div>

            <!-- Badge Image Input -->
            <div class="form-group">
                <label for="badgeImg">Badge Image:</label>
                <input type="text" id="badgeImg" v-model="stacheData.badgeImg" minlength="5" :maxlength="1000" required
                    class="form-control" />
            </div>

            <!-- Difficulty Select -->
            <div class="form-group">
                <label for="difficulty">Difficulty:</label>
                <select id="difficulty" v-model="stacheData.difficulty" required class="form-control">
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
                    class="form-control"></textarea>
            </div>

            <button class="btn btn-primary mt-3">submit</button>

        </form>
    </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { stachesService } from '../services/StachesService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
export default {
    setup() {
        const stacheData = ref({})
        const today = new Date()
        const route = useRoute()

        function resetForm() {
            stacheData.value = {}
        }

        function setForm() {

            if (AppState.activeEvent) {
                stacheData.value = {
                    name: AppState.activeStache.name,
                    description: AppState.activeStache.description,
                    lat: AppState.activeStache.lat,
                    lng: AppState.activeStache.lng,
                    hint: AppState.activeStache.hint,
                    coverImg: AppState.activeStache.coverImg,
                    badgeImg: AppState.activeStache.coverImg,
                    difficulty: AppState.activeStache.difficulty,
                }
            }
            else {
                console.log('fast render')
            }
        }

        onMounted(() => {
            resetForm()
            setForm()
        })

        return {
            today,
            route,
            activeStache: computed(() => AppState.activeStache),
            stacheData,

            async editStache() {
                try {
                    await stachesService.editStache(route.params.stachId, stacheData.value)
                    Pop.success('Your Stache was updated!')
                    Modal.getOrCreateInstance('#')
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
