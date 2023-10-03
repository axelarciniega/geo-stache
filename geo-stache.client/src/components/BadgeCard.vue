<template>
    <div v-show="badge.status === 'found'">
        <div class="medal">
            {{ badge }}
            <img :title="badge.stache.stacheName" class="badge-image" :src="adventure.stache.badgeImage" alt="Badge" />

        </div>
        <div class="badge-name">{{ badge.stache.stacheName }}</div>
    </div>
</template>

<script>
import { Adventure } from '../models/Adventure';

export default {
    props: {
        badge: { type: Adventure || Object, required: true },
        // myAdventures: { type: Adventure || Object, required: true }, stache: { type: Adventure || Object, required: true }
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
