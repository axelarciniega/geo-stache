<template>
  <router-link :to="{ name: 'Stache Details', params: { stacheId: stache.id } }">
    <!-- <router-link :to="{path: `events/${event.id}`}"> -->
    <!-- code did not like this ⬆️ -->
    <div v-if="!user.IsAuthenticated" class="row glass-card my-md-0 my-2">


      <img src="https://content.artofmanliness.com/uploads//2011/10/Moustaches-4.jpg" alt="">
      <!-- <div class="frosted-card text-light p-1">
            <p class="">{{ event.name }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.startDate }}</p>
            <p>{{ new Date(event.startDate).toLocaleDateString() }}</p>
            <p class="text-end pe-2">Capacity: {{ event.capacity }}</p>
            <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p>
        </div> -->


    </div>

    <div v-else class="component my-2">
      <div class="event-cancelled position-relative">
        <table class="row">
          <!-- <tr class="col-8">
            <th class="col-2 px-1">Difficulty</th>
            <th class="col-7 px-1">Hint</th>
            <th class="col-3 px-1">Name</th>
          </tr> -->
          <tr>
            <td class="col-3 px-1">{{ stache.name }}</td>
            <td class="col-8 px-1">{{ stache.hint.slice(0, 15) + "..." }}</td>
            <td class="col-1 px-1">{{ stache.difficulty }}</td>
          </tr>

        </table>

        <!-- <h3 class="text-danger fw-bold">CANCELLED</h3> -->
        <!-- <p class="">{{ event.name }}</p>
            <p>{{ event.location }}</p> -->
        <!-- <p>{{ event.startDate }}</p> -->
        <!-- <p>{{ new Date(event.startDate).toLocaleDateString() }}</p> -->
        <!-- <p class="text-end pe-2">Capacity: {{ event.capacity }}</p> -->
        <!-- <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p> -->
      </div>
    </div>


  </router-link>
</template>

<script>
import Login from './Login.vue';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import ModalWrapper from './ModalWrapper.vue';
import { Stache } from '../models/Stache.js';
export default {
  props: { stache: { type: Stache || Object, required: true } },
  setup() {
    return {
      user: computed(() => AppState.user)

    }
  },
  //   components: { Login, ModalWrapper }
}
</script>