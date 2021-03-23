<template>
  <div class="edit-bug-modal">
    <div class="modal fade"
         id="edit-bug"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Edit this Bug
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="editBug">
              <div class="form-group">
                <div class="row">
                  <div class="col-12 mb-3">
                    <input type="text"
                           name="title"
                           id="bug-title"
                           class="form-control"
                           placeholder="Edit Bug title"
                           aria-describedby="helpId"
                           v-model="state.bug.title"
                           required
                    >
                  </div>

                  <div class="col-12">
                    <textarea name="description"
                              id="bug-description"
                              cols="30"
                              rows="10"
                              placeholder="Describe Your Bug"
                              aria-describedby="helpId"
                              v-model="state.bug.description"
                              required
                    >
                              </textarea>
                  </div>
                </div>
              </div>
              <div class="row m-btns">
                <div class="col-6">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>

                <div class="col-6">
                  <button class="btn btn-success" type="submit">
                    Execute
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
import { bugsService } from '../services/BugsService'
export default ({
  name: 'EditBugModal',
  setup() {
    const state = reactive({
      bug: computed(() => AppState.bug)
    })
    return {
      state,

      async editBug() {
        try {
          await bugsService.editBug(state.bug)
          state.bug = {}
          $('#edit-bug').modal('hide')
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
