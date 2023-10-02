<template>
    <div class="badge">
        <!-- <div class="medal">
            <img class="badge-image" :src="badgeImage" alt="Badge" />
        </div>
        <div class="badge-name">{{ stacheName }}</div> -->
    </div>
</template>



<script>
export default {
    setup() {
        return {};
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
