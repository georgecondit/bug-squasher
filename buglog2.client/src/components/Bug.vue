<template>
  <div class="body-text">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-2 text-center">
                <router-link :to="{name: 'BugPage', params: {id: bug.id}}">
                  <h5>{{ bug.title }}</h5>
                </router-link>
                <div v-if="state.user.isAuthenticated">
                  <button class="btn btn-info my-2" type="button" data-toggle="modal" data-target="#create-note">
                    Add a Note
                  </button>
                </div>
              </div>
              <div class="col-3 text-center">
                <h5>{{ bug.description }}</h5>
              </div>
              <div class="col-2 text-center"
                   v-if="bug.closed"
              >
                <h5 class="text-success">
                  CLOSED
                </h5>
              </div>
              <div v-else class="col-2 text-center">
                <h5 class="text-danger">
                  OPEN
                </h5>
              </div>
              <div class="col-2 text-right">
                <div class="row">
                  <div class="col-6">
                    <h5>{{ state.user.email }}</h5>
                  </div>
                  <div class="col-6">
                    <img :src="state.user.picture" alt="">
                  </div>
                </div>
              </div>
              <div class="col-2 text-right">
                <div class="row">
                  <div class="col-12">
                    <p>{{ bug.createdAt }}</p>
                  </div>
                </div>
                <div v-if="!bug.closed" class="col-12">
                  <button class="btn btn-info" @click="deleteBug">
                    Squash!
                  </button>
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
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object, required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)

    })
    return {
      state,

      deleteBug() {
        return bugsService.deleteBug(props.bug.id)
      },
      getBugDate(id) {
        return bugsService.getBugDate(id)
      }
    }
  }
}
</script>
<style scoped>

</style>
