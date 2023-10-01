<template>

    <div class="container">
        <section class="row">
            <div class="col-12">
                <h3>Comments</h3>
            </div>
            <form @submit.prevent="createComment">
                <div>
                    <textarea v-model="comment.body" placeholder="say something" name="Comment" id="comment" cols="50" rows="5"></textarea>
                </div>
                <div class="col-12">
                    <button class="button-post">Post</button>
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
</style>