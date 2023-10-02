<template>
    <section>
        <router-link :to="{path: `staches/${stache.id}`}">
            {{ stache.stacheName }}
        </router-link>
    </section>
</template>

<script>
import { Stache } from '../models/Stache';





export default {
    
    props: {stache: {type: Stache || Object, required: true}},
setup() {
    
  return {};
},
};
</script>


<style>
</style>