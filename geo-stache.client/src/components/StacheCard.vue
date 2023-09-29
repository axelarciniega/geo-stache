<template>
    <router-link :to="{name: 'Stache Details', params: {stacheId: stache.id}}">
    <!-- <router-link :to="{path: `events/${event.id}`}"> -->
<!-- code did not like this ⬆️ -->

   
      
  
    
  
  <!-- <div class="component my-2"> -->
    <div class=" position-relative">
      <table class="row">
  <tr class=" elevation-1 justify-content-between d-flex">
    <td class=" col-4 text-center px-1">{{ stache.stacheName }}</td>
    <td class="col-4 text-center px-1">{{ stache.creator.name }}</td>
    <td class="col-4 text-center px-1">{{ stache.difficulty }}</td>
  </tr>
</table>
</div>


   
    

</router-link>
</template>

<script>
import Login from './Login.vue';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import ModalWrapper from './ModalWrapper.vue';
import { Stache } from '../models/Stache';
export default {
    props: {stache: {type: Stache || Object, required: true}},
  setup() {
    return {
      user: computed(()=> AppState.user)

    }
  },
//   components: { Login, ModalWrapper }
}
</script>