<template>
  <div class="create-bug-modal">
    <!-- Modal -->
    <div class="modal fade"
         id="create-bug"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              New Bug Ticket
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="create">
              <div class="form-group">
                <div class="row">
                  <div class="col-6 col-sm-3 col-md-3">
                    <input type="text"
                           name="title"
                           id="board-title"
                           class="form-control"
                           placeholder="Enter Bug title"
                           aria-describedby="helpId"
                           v-model="state.board.title"
                    >
                  </div>
                  <div class="col-6 col-sm-3 col-md-3">
                    <input type="text"
                           name="description"
                           id="bug-description"
                           class="form-control"
                           placeholder="Describe Your Bug"
                           aria-describedby="helpId"
                           v-model="state.board.title"
                    >
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button class="btn btn-success" type="submit">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default ({
  name: 'CreateBugModal',
  setup() {
    const state = reactive({
      bug: {}
    })
    return {
      state,
      async create() {
        try {
          await bugsService.create(state.bug)
          state.bug = {}
          $('#create-bug').modal('hide')
          $('.modal-backdrop').remove()
        } catch (err) {
          logger.error(err)
        }
      }
    }
  }
})
</script>
