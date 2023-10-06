<template>
    <div class="container">
        <section class="row">
            <div class="col-12">
                <h1 class="text-center p-3">Comments</h1>
            </div>
            <form @submit.prevent="createComment" class="text-center">
                <div class="justify-content-center d-flex">
                    <textarea maxLength="200" required v-model="comment.body" placeholder="say something" name="Comment"
                        id="comment" class="ps-2 card col-12 col-md-6 commentText"></textarea>
                </div>
                <div class="p-3">
                    <button class="button-class p-2">Post</button>
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
        function resetForm() {
            comment.value = { category: '' }
        }

        return {
            comment,

            async createComment() {
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
.button-class {
    background: linear-gradient(25deg, var(--Green), var(--Sand));
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
}

.button-class:hover {
    background: linear-gradient(25deg, var(--LghtGreen), var(--DrkGreen));
    transform: scale(1.5);
    color: var(--UltraDrkGreen)
}

.commentText {
    background: linear-gradient(25deg, var(--Sand), var(--LghtGreen));
}

.commentText::placeholder {
    color: var(--DrkGreen)
}
</style>