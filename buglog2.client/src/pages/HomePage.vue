<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-5 offset-1">
      </div>
      <div class="col-5 offset-1">
        <div v-if="state.user.isAuthenticated">
          <button class="btn btn-info my-2" type="button" data-toggle="modal" data-target="#create-bug">
            New BUG ticket
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="col-10 offset-1">
              <div class="row text-center">
                <div class="col-2">
                  <h3>Title:</h3>
                </div>
                <div class="col-3 text-right">
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
              </div>
              <div class="=row">
                <div v-if="state.user.isAuthenticated">
                  <Bug class="col-12" v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService.js'
import { Bug } from '../components/Bug'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)

    })
    onMounted(async() => {
      await bugsService.getAll()
    })
    return {
      state
    }
  },
  components: {
    Bug
  }
}
</script>

<style scoped>

</style>
