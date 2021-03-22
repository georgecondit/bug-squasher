<template>
  <div class="container-fluid">
    <div class="card">
      <div class="row">
        <div class="col-1 offset-3 text-right">
          <h4>Bug Note: </h4>
        </div>
        <div class="col-2">
          <h4>
            Note: {{ note.body }}
          </h4>
        </div>
        <div class="col-2">
          <h3>By: {{ note.creator.email }}</h3>
        </div>
        <div class="col-1 mt-1">
          <button class="btn btn-danger btn-sm" @click="deleteNote">
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
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
