<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-5 offset-1 text-right">
        <h2 class="my-2">
          Welcome {{ state.account.email }}
        </h2>
      </div>
      <div class="col-5 offset-1">
        <button class="btn btn-danger py-2 my-1" type="button" data-toggle="modal" data-target="#create-bug">
          New BUG ticket
        </button>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-2 text-center">
                <h3>Title:</h3>
              </div>
              <div class="col-4">
                <h3>Bug details:</h3>
              </div>
              <div class="col-2 text-center">
                <h3>Status:</h3>
              </div>
              <div class="col-2">
                <h3>Creator:</h3>
              </div>
              <div class="col-2">
                <h3>Created:</h3>
              </div>
              <!-- <div class="col-1">
                <button class="btn btn-info" @click.prevent="close">
                  Squash!
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Bug v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
      </div>
    </div>
    <div class="row">
      <Note class="col-12" v-for="note in state.notes" :key="note._id" :note="note" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.board),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes)
    })
    onBeforeMount(() => {
      AppState.notes = []
    })
    onMounted(() => {
      bugsService.getBugById(route.params.id)
    })
    return {
      state,
      route,
      async createNote() {
        state.Note.bug = AppState.bug.id
        await notesService.createNote(state.note)
        state.note = {}
      },

      async close() {
        await bugsService.delete(state.bug.id)
        router.push({ name: 'Home' })
      }
    }
  }
}
</script>
