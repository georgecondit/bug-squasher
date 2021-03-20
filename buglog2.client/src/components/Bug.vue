<template>
  <router-link :to="{name: 'BugPage', params: {id: state.id}}">
    <div class="body-text">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-2 text-center">
                  <h5>{{ bug.title }}</h5>
                </div>
                <div class="col-5 text-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
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
      }
    }
  }
}
</script>
<style scoped>

</style>
