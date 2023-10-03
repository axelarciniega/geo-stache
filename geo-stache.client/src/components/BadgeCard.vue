<template>
    <div>
        <div v-if="adventure.status === 'todo'"> <!-- Use '===' for strict equality -->
            Display as Todo
        </div>

        <div v-else class="badge"> <!-- Use 'v-else' for the else condition -->
            <div class="medal">
                <img class="badge-image" :src="adventure.stache.badgeImage" alt="Badge" />
            </div>
            <div class="badge-name">{{ adventure.stache.stacheName }}</div>
        </div>
    </div>
</template>

<script>
import { Adventure } from '../models/Adventure';

export default {
    props: {
        adventure: { type: Adventure || Object, required: true }
    }
};
</script>

<style scoped>
.badge {
    text-align: center;
}

.medal {
    display: inline-block;
    position: relative;
}

.badge-image {
    width: 100px;
    border-radius: 50%;
    border: 3px solid #ffd700;
    padding: 5px;
}

.badge-name {
    margin-top: 5px;
    font-weight: bold;
}
</style>
