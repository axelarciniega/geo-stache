<template>
  <div class="about">
    <h1></h1>
  </div>

  <section class="container">
    <section>
      <div class="row table-card align-items-center text-dark">
        <!-- This will be filled proper later -->
        <div class="col-2 p-1"><img class="profile-pic"
            src="https://images.unsplash.com/photo-1547809397-e2c7eea071fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt="">
          <p class="text-center fw-bold m-0">Tyler</p>
        </div>
        <div class="col-10 px-1">Beard wax? Nah, it's MOUSTACHE wax!
          <div class="text-end">
            <i class="mdi mdi-github fs-1"></i>
            <i class="mdi mdi-linkedin fs-1"></i>
          </div>
        </div>
        <!-- <td class="col-1 px-1">Germany</td> -->
      </div>

      <div class="row table-card align-items-center text-dark">
        <!-- This will be filled proper later -->
        <div class="col-2 p-1"><img class="profile-pic"
            src="https://media.istockphoto.com/id/515399607/photo/close-up-of-young-man-with-long-moustaches.webp?b=1&s=170667a&w=0&k=20&c=c_Vs53atn9yVfi_JPw_61z6mDidu-1e3euNMGmtR5vg="
            alt="">
          <p class="text-center fw-bold m-0">Axel</p>
        </div>
        <div class="col-10 px-1">You can't handle these handlebars
          <div class="text-end">
            <i class="mdi mdi-github fs-1"></i>
            <i class="mdi mdi-linkedin fs-1"></i>
          </div>
        </div>
        <!-- <td class="col-1 px-1">Germany</td> -->
      </div>

      <div class="row table-card align-items-center text-dark">
        <!-- This will be filled proper later -->
        <div class="col-2 p-1"><img class="profile-pic"
            src="https://plus.unsplash.com/premium_photo-1661720137713-a85a195e0b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt="">
          <p class="text-center fw-bold m-0">Sam</p>
        </div>
        <div class="col-10 px-1">I promise this is a bubble pipe
          <div class="text-end">
            <i class="mdi mdi-github fs-1"></i>
            <i class="mdi mdi-linkedin fs-1"></i>
          </div>
        </div>
        <!-- <td class="col-1 px-1">Germany</td> -->
      </div>

      <div class="row table-card align-items-center text-dark">
        <!-- This will be filled proper later -->
        <div class="col-2 p-1"><img class="profile-pic"
            src="https://images.unsplash.com/photo-1588255890583-49e168f61999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
            alt="">
          <p class="text-center fw-bold m-0">Tiffany</p>
        </div>
        <div class="col-10 px-1">Art of the 'stache is the pinnacle of class
          <div class="text-end">
            <i class="mdi mdi-github fs-1"></i>
            <i class="mdi mdi-linkedin fs-1"></i>
          </div>
        </div>
        <!-- <td class="col-1 px-1">Germany</td> -->
      </div>

      <div class="row table-card align-items-center text-dark">
        <!-- This will be filled proper later -->
        <div class="col-2 p-1"><img class="profile-pic"
            src="https://images.unsplash.com/photo-1534309466160-70b22cc6f854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80"
            alt="">
          <p class="text-center fw-bold m-0">Camille</p>
        </div>
        <div class="col-10 px-1">It's all in the twirl
          <div class="text-end">
            <i class="mdi mdi-github fs-1"></i>
            <i class="mdi mdi-linkedin fs-1"></i>
          </div>
        </div>
        <!-- <td class="col-1 px-1">Germany</td> -->
      </div>

    </section>
  </section>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.profile-pic {
  border-radius: 15px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.table-card {
  backdrop-filter: blur(15px);
  // background-color: #e3d4bf;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  width: 100%;
}
</style>
