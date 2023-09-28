<template>
    <div>

        <!-- Stache Name Input -->
        <div class="form-group">
            <label for="stacheName">Stache Name:</label>
            <input type="text" id="stacheName" v-model="stacheName" minlength="3" maxlength="50" required />
            <small class="text-muted">Minimum length: 3, Maximum length: 50 characters</small>
        </div>
        <!-- Cover Image Input -->
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

        <!-- Location Tag Select -->
        <!-- <div class="form-group">
            <label for="locationTag">Difficulty:</label>
            <select id="locationTag" v-model="locationTag" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div> -->

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
    </div>
</template>


<script>
export default {
    setup() {
        return {};
    },
};
</script>


<style></style>