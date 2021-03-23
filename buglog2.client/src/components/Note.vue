<template>
  <!-- <div v-if="bug.creator"> -->
  <div class="container-fluid">
    <div class="card mt-4">
      <div class="row my-3 align-items-center">
        <div class="col-2 text-right">
          <h5>Bug Note: </h5>
        </div>
        <div class="col-3 text-left">
          <h5>
            {{ note.body }}
          </h5>
        </div>
        <div class="col-2 text-center">
          <h5>By: {{ note.creator.email }}</h5>
        </div>
        <div class="col-2 text-center mt-1">
          <!-- <div v-if="state.user.email===bug.creator.email"> -->
          <button class="btn btn-danger btn-sm" @click="deleteNote">
            delete
          </button>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.bug)

    })
    return {
      state,
      async deleteNote() {
        notesService.delete(props.note)
      }
    }
  }
}
</script>

<style scoped>
</style>
