<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">

      </h1>
    </div>
  </div>
</template>

<script>
import { stachesService } from '../services/StachesService.js'
import Pop from '../utils/Pop.js'
import { onMounted } from "vue";

export default {
  setup() {

    onMounted(() => getStacheById())

    async function getStacheById() {
      try {
        await stachesService.getStacheById()
      } catch (error) {
        Pop.error(error)
      }
    }



    return {}
  }
}
</script>








<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
