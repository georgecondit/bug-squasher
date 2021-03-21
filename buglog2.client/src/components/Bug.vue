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
              </div>
              <div class="col-4 text-center">
                <h5>{{ bug.description }}</h5>
              </div>
              <div class="col-1 text-left">
                <h5>{{ bug.closed }}</h5>
              </div>
              <div class="col-2">
                <h5>{{ state.user.email }}</h5>
              </div>
              <div class="col-2 text-right">
                <p>{{ bug.createdAt }}</p>
              </div>
              <button class="btn btn-info" @click="deleteBug">
                Squash!
              </button>
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
        return bugsService.getBugdDate(id)
      }
    }
  }
}
</script>
<style scoped>

</style>
