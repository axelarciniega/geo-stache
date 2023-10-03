<template>

    <div class="container">
        <section class="row">
            <div class="col-12">
                <h3 class="text-center">Comments</h3>
            </div>
            <form @submit.prevent="createComment" class="text-center">
                <div>
                    <textarea v-model="comment.body" placeholder="say something" name="Comment" id="comment" class="col-12 col-md-6"></textarea>
                </div>
                <div class="col-12">
                    <button class="button-class">Post</button>
                </div>
            </form>


        </section>




    </div>


</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { ref } from 'vue';
import { commentsService } from '../services/CommentsService.js';


export default {
    



setup() {
    const route = useRoute()
    const comment = ref({})
    function resetForm(){
        comment.value = {category: ''}
    }

  return {
    comment,

    async createComment(){
        try {
            comment.value.stacheId = route.params.stacheId
            await commentsService.createComment(comment.value)
            Pop.success('Posted Comment')
            resetForm()
        } catch (error) {
            Pop.error(error)
        }
    }

  };
},
};
</script>


<style>

.button-class{
    background: linear-gradient(25deg, #41644A, #adc7b3);
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s
}

.button-class:hover{
    background: linear-gradient(25deg, #adc7b3, #41644A );
    transform: translateY(-5px);
}

</style>