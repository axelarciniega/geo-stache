<template>
    <div class="adventure-card bgToDo2 elevation-5">
        <div class="adventure-content d-flex justify-content-between" v-show="adventure.status === 'todo'">
            <div class="adventure-title text-black fw-bold">{{ adventure.stache.stacheName }}</div>
            <img class="badge-pic" :src="adventure.stache.badgeImage" alt="">

            <router-link :to="{ name: 'Stache Details', params: { stacheId: adventure.stacheId } }">
                <div class="btn btn-secondary btn-sm fw-bold text-black rounded-pill elevation-5">➕</div>
            </router-link>

            {{ adventure.status }}
        </div>
    </div>
</template>
  
<script>
import { Adventure } from '../models/Adventure';

export default {
    props: {
        adventure: { type: Adventure || Object, required: true },
    },
};
</script>
  
<style scoped>
.adventure-card {
    border: 1px solid #171f15;
    border-radius: 15px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(95, 104, 66, 0.396);
}

.bgToDo2 {
    background: linear-gradient(45deg, var(--LghtGreen), var(--Green));
}

.adventure-content {
    padding: 10px;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border-radius: 10px;
    background-color: #b4c2b7;
}

.bgOrange {
    background: linear-gradient(25deg, var(--LghtOrange), var(--Orange));
}

.adventure-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
}

.badge-pic {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}

.badge-pic2 {
    width: 82px;
    height: 82px;
    border-radius: 60%;
}

/* Add more styles as needed */
</style>
  