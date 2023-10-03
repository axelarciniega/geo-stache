<template>
    <div>

        <router-link :to="{ name: 'Stache Details', params: { stacheId: adventure.stacheId } }">
            <div class="glassCard m-1 text-dark fw-bold" v-show="adventure.status === 'todo'">
                <div class="text-center font-monospace"> {{ adventure.stache.stacheName }} </div>

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

.glassCard {

    background: #41644a6f;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 3px solid rgba(127, 124, 24, 0.673);
}

.badge-name {
    margin-top: 5px;
    font-weight: bold;
}
</style>


