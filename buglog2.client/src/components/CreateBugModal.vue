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
                  <div class="col-12 mb-3">
                    <input type="text"
                           name="title"
                           id="bug-title"
                           class="form-control"
                           placeholder="Enter Bug title"
                           aria-describedby="helpId"
                           v-model="state.bug.title"
                    >
                  </div>
                  <div class="row"></div>
                  <div class="col-12 ">
                    <textarea name="description"
                              id="bug-description"
                              cols="30"
                              rows="10"
                              placeholder="Describe Your Bug"
                              aria-describedby="helpId"
                              v-model="state.bug.description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row justify-content">
                <div class="col-12 ">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button class="btn btn-success" type="submit">
                    Create
                  </button>
                </div>
              </div>
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
