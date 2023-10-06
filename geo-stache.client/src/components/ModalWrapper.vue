<template>
    <transition name="modal-animation">
        <!-- ✅ DONE: modalActive is a bool from the old project we copied from, shoule change or remove.v-show="modalActive" -->
        <div class="modal">

        </div>
    </transition>
    <!-- Modal trigger button -->
    <button v-if="showButton" type="button" class="btn create-btn" data-bs-toggle="modal" :data-bs-target="`#${id}`"
        @click="setEditStacheToNull">
        <slot name="button">
            open {{ id }} modal
        </slot>
    </button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <!-- re-bind (":") the ID, was throwing erros in testing, so took out -->
    <!-- id should be bound :id="?" -->
    <div class="modal" :id="id" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
            <div class="modal-content bg-secondary border border-2 border-orangeS">
                <div class="modal-header">
                    <slot name="header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </slot>
                </div>
                <div class="modal-body text-dark">
                    <slot name="body">

                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { stachesService } from "../services/StachesService.js";


export default {
    props: { id: { type: String, required: true }, showButton: { type: Boolean, default: true }, btnColor: { type: String, default: 'primary' } },
    setup() {
        return {
            setEditStacheToNull() {
                stachesService.setEditStacheToNull()
            }
        }
    }
}

</script>
<style>
.icon {
    background: url('your-image-url.jpg')src="./assets/img/Stache.png";
    height: 20px;
    width: 20px;
    display: block;
}

.create-btn {
    /* border: 3px solid #e16a34 !important; */
    border: 3px solid var(--Orange) !important;
    color: var(--Orange) !important;

}

.create-btn:hover {
    background-color: var(--Orange) !important;
    color: var(--LghtSand) !important;
    border: 3px solid var(--Green) !important;
    transition: .35s;
}

.sub-btn {
    background-color: var(--DrkGreen);
    color: var(--Sand);
    transition: background-color 0.3s, color 0.3s;
}

.sub-btn:hover {
    background-color: var(--Green);
    color: var(--Sand);
}
</style>
