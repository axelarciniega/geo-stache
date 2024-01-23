<template>
  <section>
    <router-link class="text-color" :to="{ name: 'Stache Details', params: { stacheId: stache.id } }">
      {{ stache.stacheName }}
    </router-link>
  </section>
</template>

<script>
import { Stache } from '../models/Stache';





export default {

  props: { stache: { type: Stache || Object, required: true } },
  setup() {

    return {};
  },
};
</script>


<style>
.text-color {
  color: #41644A;
}

.text-color:hover {
  color: #F3971B;
}
</style>