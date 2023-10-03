<template>
    <div>
        <router-link :to="{ path: `staches/${adventure.stacheId}` }">
            <div v-show="adventure.status === 'todo'">
                {{ adventure.stache.stacheName }}
                {{ adventure.stacheId }}
            </div>
        </router-link>
    </div>
</template>



<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Adventure } from '../models/Adventure';

Adventure
export default {
    props: {
        adventure: { type: Adventure || Object, required: true }
    },
    setup() {
        return {

        };
    },
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


