<template>
  <div class="col-10 offset-2" v-if="note.creator">
    <h5>
      <button class="btn btn-danger btn-sm" @click="deleteNote">
        x
      </button>
      <span class="mr-4">{{ note.creator }}: {{ note.body }}</span>
    </h5>
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
      notes: computed(() => AppState.notes)
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
