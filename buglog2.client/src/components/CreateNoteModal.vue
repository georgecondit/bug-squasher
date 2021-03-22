<template>
  <div class="create-note-modal">
    <div class="modal fade"
         id="create-note"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Note to this Bug
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createNote">
              <div class="form-group">
              </div>
              <div class="row">
                <div class="col-12">
                  <textarea name="note-text"
                            id="note-description"
                            cols="30"
                            rows="10"
                            placeholder="Add a Note"
                            aria-describedby="helpId"
                            v-model="state.note.body"
                            required
                  >
                  </textarea>
                </div>
              </div>
              <div class="row m-btns">
                <div class="col-6 text-center">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>

                <div class="col-6 text-center">
                  <button class="btn btn-success" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default ({
  name: 'CreateNoteModal',
  setup() {
    const state = reactive({
      note: {},
      bug: computed(() => AppState.bug)
    })
    return {
      state,

      async createNote() {
        try {
          state.note.bug = state.bug
          await notesService.createNote(state.note)
          state.note = {}
          $('#create-note').modal('hide')
          $('.modal-backdrop').remove()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
})
</script>

<style scoped>
.m-btns{
  justify-content: space-between;
}
</style>
