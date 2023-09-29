<template>
  <router-link :to="{ name: 'Stache Details', params: { stacheId: stache.id } }">
    <!-- <router-link :to="{path: `events/${event.id}`}"> -->
<!-- code did not like this ⬆️ -->

   
      
  
    
  
  <!-- <div class="component my-2"> -->
    <div class=" position-relative">
      <table class="row">
  <tr>
    <td class="col-2 px-1">{{ stache.stacheName }}</td>
    <td class="col-7 px-1">{{ stache.creator.name }}</td>
    <td class="col-3 px-1">{{ stache.difficulty }}</td>
  </tr>
</table>
</div>


        <!-- </div> -->
    <!-- </div> -->
    

  </router-link>
</template>

<script>
import Login from './Login.vue';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import ModalWrapper from './ModalWrapper.vue';
// <<<<<<< HEAD
import { Stache } from '../models/Stache.js';
export default {
  props: { stache: { type: Stache || Object, required: true } },
  // =======
  // import { Stache } from '../models/Stache';
  // export default {
  //     props: {stache: {type: Stache || Object, required: true}},
  // // >>>>>>> 025bd5e36a7da95156e582bff058305b343cee8b
  setup() {
    return {
      user: computed(() => AppState.user)

    }
  },
  //   components: { Login, ModalWrapper }
}
</script>